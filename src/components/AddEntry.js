import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const AddEntry = ({ tripId }) => {
  const [entry, setEntry] = useState({
    tripId: tripId,
    location: "",
    title: "",
    body: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  console.log("uid:", uid);

  const handleChange = (event) => {
    setEntry({ ...entry, [event.target.name]: event.target.value });
  };

  // const handleSubmit = async (event) => {
  //   try {
  //     event.preventDefault();
  //     setLoading(true);
  //     await ref.doc(entry.id).set(entry);
  //     setEntry({
  //       id: uuidv4(),
  //       tripId: props.tripId,
  //       date: "",
  //       location: "",
  //       title: "",
  //       body: "",
  //     });
  //     setLoading(false);
  //   } catch (error) {
  //     console.log("There was an error adding entry.");
  //   }
  // };
  const addNewEntry = (entry) => {
    setLoading(true);
    firestore
      .collection("users")
      .doc(uid)
      .collection("trips")
      .doc(tripId)
      .add({
        ...entry,
        isDone: false,
      })
      .then((docRef) => {
        docRef.update({
          entryId: docRef.id,
        });
      });
    setEntry({
      tripId: tripId,
      location: "",
      title: "",
      body: "",
      date: "",
    });
    setLoading(false);
  };

  return (
    <Container>
      {/* <Form onSubmit={handleSubmit}> */}
      <Form action="">
        <Form.Group controlId="formBasicDate">
          <Form.Label>Entry Date</Form.Label>
          <Form.Control
            name="date"
            onChange={handleChange}
            value={entry.date}
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

        <Form.Group controlId="formBasicLocation">
          <Form.Label>Where did you go?</Form.Label>
          <Form.Control
            name="location"
            onChange={handleChange}
            value={entry.location}
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

        <Button
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            addNewEntry(entry);
          }}
        >
          {loading ? "Loading..." : "Add Trip"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddEntry;
