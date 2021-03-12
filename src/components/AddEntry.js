import { useState } from "react";
import { Link } from "react-router-dom";

import firebase from "../utils/config";
import { v4 as uuidv4 } from "uuid";

const AddEntry = () => {
  const currentDate = new Date().toLocaleDateString();
  const [entry, setEntry] = useState({
    id: uuidv4(),
    location: "",
    title: "",
    body: "",
    createdAt: currentDate,
  });
  const [loading, setLoading] = useState(false);
  const ref = firebase.firestore().collection("entries");

  const handleChange = (event) => {
    setEntry({ ...entry, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      await ref.doc(entry.id).set(entry);
      setEntry({
        location: "",
        title: "",
        body: "",
      });
      setLoading(false);
    } catch (error) {
      console.log("There was an error adding entry.");
    }
  };

  return (
    <div>
      <Link to="/">Back to Entries</Link>
      <h4>Please add a new entry</h4>
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
          {loading ? <h3>🕓</h3> : <h3>Add Entry</h3>}
        </button>
      </form>
    </div>
  );
};

export default AddEntry;
