import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const AddCountry = () => {
  const [country, setCountry] = useState({
    name: "",
  });

  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  const [loading, setLoading] = useState(false);
  console.log("uid:", uid);

  const handleChange = (event) => {
    setCountry({ ...country, [event.target.name]: event.target.value });
  };

  const addNewCountry = (country) => {
    setLoading(true);
    firestore
      .collection("users")
      .doc(uid)
      .collection("countries")
      .add({
        ...country,
        isDone: false,
      })
      .then((docRef) => {
        docRef.update({
          countryId: docRef.id,
        });
      });
    setCountry({
      name: "",
    });
    setLoading(false);
  };

  return (
    <Container>
      {/* <Form onSubmit={handleSubmit}> */}
      <Form action="">
        <Form.Group controlId="formBasicName">
          <Form.Label>Country Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            value={country.name}
          />
        </Form.Group>

        <Button
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            addNewCountry(country);
          }}
        >
          {loading ? "Loading..." : "Add country"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddCountry;
