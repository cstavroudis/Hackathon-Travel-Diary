const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = require("express")();

const auth = require("./utils/auth");

const {
  getAllEntries,
  getOneEntry,
  postOneEntry,
  deleteEntry,
  editEntry,
} = require("./API/entries");

const {
  loginUser,
  signUpUser,
  // uploadProfilePhoto,
  getUserDetails,
  updateUserDetails,
} = require("./API/users");

// Entries
// auth makes API calls require a token
app.get("/entries", getAllEntries);
app.get("/entry/:entryId", getOneEntry);
app.post("/entry", postOneEntry);
app.delete("/entry/:entryId", deleteEntry);
app.put("/entry/:entryId", editEntry);

// Users
app.post("/login", loginUser);
app.post("/signup", signUpUser);
// app.post("/user/image", auth, uploadProfilePhoto);
app.get("/user", auth, getUserDetails);
app.post("/user", auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
