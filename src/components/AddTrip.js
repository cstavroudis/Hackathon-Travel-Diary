import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const AddTrip = () => {
  const [trip, setTrip] = useState({
    title: "",
    countries: "",
    date: "",
  });
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const [loading, setLoading] = useState(false);
  // const ref = firebase.firestore().collection("trips");

  const handleChange = (event) => {
    setTrip({ ...trip, [event.target.name]: event.target.value });
  };

  const addNewTrip = (trip) => {
    setLoading(true);
    firestore
      .collection("users")
      .doc(uid)
      .collection("trips")
      .add({
        ...trip,
        isDone: false,
      })
      .then((docRef) => {
        docRef.update({
          tripId: docRef.id,
        });
      });
    setTrip({
      title: "",
      date: "",
      countries: "",
    });
    setLoading(false);
  };

  return (
    <Container>
      {/* <Form onSubmit={handleSubmit}> */}
      <Form action="">
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Trip Title</Form.Label>
          <Form.Control
            name="title"
            onChange={handleChange}
            value={trip.title}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDate">
          <Form.Label>Trip Date</Form.Label>
          <Form.Control name="date" onChange={handleChange} value={trip.date} />
          <Form.Text>Please enter MM/YYYY</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicCountries">
          <Form.Label>Country(s) Visited</Form.Label>
          <Form.Control
            name="countries"
            onChange={handleChange}
            value={trip.countries}
          />
          <Form.Text>Please separate by commas.</Form.Text>
        </Form.Group>

        {/* <Button size="sm" type="submit">
          {loading ? "Loading..." : "Add Trip"}
        </Button> */}
        <Button
          onClick={(event) => {
            event.preventDefault();
            addNewTrip(trip);
          }}
        >
          {loading ? "Loading..." : "Add Trip"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddTrip;
