import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import firebase from "../utils/config";
import { v4 as uuidv4 } from "uuid";

const AddEntry = (props) => {
  const [entry, setEntry] = useState({
    id: uuidv4(),
    tripId: props.tripId,
    location: "",
    title: "",
    body: "",
    date: "",
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
        id: uuidv4(),
        tripId: props.tripId,
        date: "",
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
    <Container>
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
          {loading ? "Loading..." : "Add Entry"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddEntry;
