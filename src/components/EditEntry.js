import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import firebase from "../utils/config";

const EditEntry = (route) => {
  const id = route.match.params.id;
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState({
    id: id,
    date: "",
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
    <Container>
      <Link to="/">Back to Entries</Link>
      <h4>Please edit your entry</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicDate">
          <Form.Label>Entry Date</Form.Label>
          <Form.Control
            name="date"
            onChange={handleChange}
            value={entry.date}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLocation">
          <Form.Label>Entry Location</Form.Label>
          <Form.Control
            name="location"
            onChange={handleChange}
            value={entry.location}
          />
        </Form.Group>

        <Form.Group controlId="formBasicTitle">
          <Form.Label>Entry Title</Form.Label>
          <Form.Control
            name="title"
            onChange={handleChange}
            value={entry.title}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBody.ControlTextarea1">
          <Form.Label>Entry Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="body"
            onChange={handleChange}
            value={entry.body}
          />
        </Form.Group>

        <Button size="sm" type="submit">
          {loading ? "Loading..." : "Edit Entry"}
        </Button>
      </Form>
    </Container>
  );
};

export default EditEntry;
