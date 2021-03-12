import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import firebase from "../utils/config";

const EditEntry = (route) => {
  const id = route.match.params.id;
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState({
    id: id,
    location: "",
    title: "",
    body: "",
  });

  const ref = firebase.firestore().collection("entries");

  const handleChange = (event) => {
    setEntry({ ...entry, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      await ref.doc(entry.id).set(entry);
      getEntries(id);
      setLoading(false);
    } catch (error) {
      console.log("There was an error editing entry.");
    }
  };

  const getEntries = async (id) => {
    try {
      console.log("get api call for:", id);
      const doc = await ref.doc(id).get();
      const data = doc.data();
      setEntry(data);
    } catch (error) {
      console.log("There was an error getting document:", error);
    }
  };

  useEffect(() => {
    getEntries(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Link to="/">Back to Entries</Link>
      <h4>Please edit your entry</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="location">Entry Location</label>
          <input
            name="location"
            onChange={handleChange}
            value={entry.location}
          />
        </div>
        <div>
          <label htmlFor="title">Entry Title</label>
          <input name="title" onChange={handleChange} value={entry.title} />
        </div>
        <div>
          <label htmlFor="body">Entry Body</label>
          <input name="body" onChange={handleChange} value={entry.body} />
        </div>
        <button type="submit">
          {loading ? <h3>🕓</h3> : <h3>Edit Entry</h3>}
        </button>
      </form>
    </div>
  );
};

export default EditEntry;
