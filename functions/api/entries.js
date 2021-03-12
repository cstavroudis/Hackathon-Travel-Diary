const { db } = require("../util/admin");

// GET /api/entries
exports.getAllEntries = async (req, res) => {
  try {
    const data = await db
      .collection("entries")
      // .where("username", "==", req.user.username)
      .orderBy("createdAt", "desc")
      .get();
    let entries = [];
    data.forEach((doc) => {
      console.log("current doc:", doc);
      entries.push({
        entryId: doc.id,
        title: doc.data().title,
        body: doc.data().body,
        createdAt: doc.data().createdAt,
      });
    });
    res.json(entries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.code });
  }
};

// GET /api/entry/:entryId
exports.getOneEntry = async (req, res) => {
  try {
    const doc = await db.doc(`/entries/${req.params.entryId}`).get();
    if (!doc.exists) {
      res.status(404).json({ error: "Entry not found" });
    }

    if (doc.data().username !== req.user.username) {
      res.status(403).json({ error: "Unauthorized" });
    }
    let entryData = doc.data();
    entryData.entryId = doc.id;
    res.json(entryData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.code });
  }
};

// POST //entry
exports.postOneEntry = async (req, res) => {
  try {
    if (req.body.body.trim() === "") {
      return res.status(400).json({ body: "Must not be empty" });
    }

    if (req.body.title.trim() === "") {
      return res.status(400).json({ title: "Must not be empty" });
    }

    const newEntry = {
      username: req.user.username,
      title: req.body.title,
      body: req.body.body,
      createdAt: new Date().toISOString(),
    };
    const doc = await db.collection("entries").add(newEntry);
    newEntry.id = doc.id;
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    console.error(error);
  }
};

// DELETE /api/entry/:entryId
exports.deleteEntry = async (req, res) => {
  try {
    // firestore path
    const document = db.doc(`/entries/${req.params.entryId}`);
    const doc = await document.get();
    if (doc.data().username !== req.user.username) {
      return res.status(403).json({ error: "UnAuthorized" });
    }
    if (!doc.exists) {
      res.status(404).json({ error: "Entry not found" });
    } else {
      document.delete();
      res.json({ message: "Delete successfull" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.code });
  }
};

// PUT /api/entry/:entryId
exports.editEntry = async (req, res) => {
  try {
    if (req.body.entryId || req.body.createdAt) {
      res.status(403).json({ message: "Not allowed to edit" });
    }
    let document = await db.collection("entries").doc(`${req.params.entryId}`);
    await document.update(req.body);
    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.code });
  }
};
