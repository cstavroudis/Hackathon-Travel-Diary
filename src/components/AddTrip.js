import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import firebase from "../utils/config";

const AddTrip = () => {
  const [trip, setTrip] = useState({
    id: "",
    title: "",
    countries: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const ref = firebase.firestore().collection("trips");

  const handleChange = (event) => {
    setTrip({ ...trip, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const countries = [...trip.countries.split(", ")];
      const id = trip.title;
      await setTrip({ ...trip, id });
      await setTrip({ ...trip, countries });
      console.log("trip:", trip);
      setLoading(true);
      await ref.doc(id).set(trip);
      setTrip({
        id: "",
        title: "",
        date: "",
        countries: "",
      });
      setLoading(false);
    } catch (error) {
      console.log("There was an error adding trip.", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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

        <Button size="sm" type="submit">
          {loading ? "Loading..." : "Add Trip"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddTrip;
