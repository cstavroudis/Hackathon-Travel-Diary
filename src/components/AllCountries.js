import React from "react";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import AddCountry from "./AddCountry";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";

import "../css/AllCountries.css";

const AllCountries = () => {
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();

  useFirestoreConnect({
    collection: `users/${uid}/countries`,
    storeAs: "countries",
  });

  const countries = useSelector((state) => state.firestore.data.countries);

  console.log("countries:", countries);

  const deleteCountry = async (countryId) => {
    try {
      await firestore
        .collection("users")
        .doc(uid)
        .collection("countries")
        .doc(countryId)
        .delete();
      console.log("country deleted:", countryId);
    } catch (error) {
      console.log("There was an error deleting country:", error);
    }
  };

  return (
    <Container>
      <Jumbotron>
        <h1>{displayName}'s Visited Countries</h1>
      </Jumbotron>

      {!countries ? (
        <div>Add your first country here.</div>
      ) : (
        <div>
          {Object.values(countries).map((country) => {
            return (
              <Container className="country" key={country.countryId}>
                <h2>{country.name}</h2>
                <Button
                  className="country-btn"
                  variant="danger"
                  size="sm"
                  onClick={() => deleteCountry(country.countryId)}
                >
                  Delete
                </Button>
              </Container>
            );
          })}
        </div>
      )}
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Add Country
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <AddCountry />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default AllCountries;
