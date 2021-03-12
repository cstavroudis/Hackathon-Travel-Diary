const { admin, db } = require("../util/admin");
const config = require("../util/config");

const firebase = require("firebase");

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require("../util/validators");

// for uploading photo
const BusBoy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");

// POST /api/login
exports.loginUser = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const { valid, errors } = validateLoginData(user);
    if (!valid) {
      res.status(400).json(errors);
    }
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
    const token = await data.user.getIdToken();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(403).json({ general: "wrong credentials, please try again" });
  }
};

// POST /api/signup
exports.signUpUser = async (req, res) => {
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      username: req.body.username,
    };
    const { valid, errors } = validateSignUpData(newUser);
    if (!valid) {
      res.status(400).json(errors);
    }

    let token, userId, data;
    // adding user to "users" collection
    const doc = await db.doc(`/users/${newUser.username}`).get();
    if (doc.exists) {
      res.status(400).json({ username: "this username is already taken" });
    } else {
      data = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);
    }
    userId = data.user.uid;
    token = await data.user.getIdToken();
    const userCredentials = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      phoneNumber: newUser.phoneNumber,
      country: newUser.country,
      email: newUser.email,
      createdAt: new Date().toISOString(),
      userId,
    };
    // adding user info to fields of document
    await db.doc(`/users/${newUser.username}`).set(userCredentials);
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    if (error.code === "auth/email-already-in-use") {
      res.status(400).json({ email: "Email already in use" });
    } else {
      res
        .status(500)
        .json({ general: "Something went wrong, please try again" });
    }
  }
};

const deleteImage = async (imageName) => {
  try {
    const bucket = admin.storage().bucket();
    const path = `${imageName}`;
    await bucket.file(path).delete();
    return;
  } catch (error) {
    return;
  }
};

// POST /api/user/image
exports.uploadProfilePhoto = (req, res) => {
  const busboy = new BusBoy({ headers: req.headers });
  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      res.status(400).json({ error: "Wrong file type submited" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${req.user.username}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });
  deleteImage(imageFileName);
  busboy.on("finish", async () => {
    try {
      await admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filePath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
            },
          },
        });
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
      await db.doc(`/users/${req.user.username}`).update({ imageUrl });
      res.json({ message: "Image uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.code });
    }
  });
  busboy.end(req.rawBody);
};

// GET /api/user
exports.getUserDetails = async (req, res) => {
  try {
    let userData = {};
    const doc = await db.doc(`/users/${req.user.username}`).get();
    if (doc.exists) {
      userData.userCredentials = doc.data();
      res.json(userData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.code });
  }
};

// POST //user
exports.updateUserDetails = async (req, res) => {
  try {
    let document = db.collection("users").doc(`${req.user.username}`);
    await document.update(req.body);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cannot Update the value" });
  }
};
