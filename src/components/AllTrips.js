import React, { useEffect, useState } from "react";
import firebase from "../utils/config";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AddTrip from "./AddTrip";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

// import "./AllTrips.css";

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const ref = firebase.firestore().collection("trips");

  const getAllTrips = () => {
    ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      console.log("list:", list);
      setTrips(list);
    });
  };

  // const deleteEntry = async (id) => {
  //   try {
  //     await ref.doc(String(id)).delete();
  //   } catch (error) {
  //     console.log(
  //       "There was an error in deleteEntry func in AllTrips component:",
  //       error
  //     );
  //   }
  // };

  useEffect(() => {
    getAllTrips();
    // eslint-disable-next-line
  }, []);

  console.log("trips:", trips);

  return (
    <Container>
      <Jumbotron>
        <h1>My Trips</h1>
      </Jumbotron>

      {trips.length < 1 ? (
        <div>Add your first trip here.</div>
      ) : (
        <div>
          {trips.map((trip) => {
            return (
              <Container className="all-trips-single" key={trip.id}>
                <Link to={`/trips/${trip.id}/entries`}>
                  <h2>{trip.title}</h2>
                </Link>
                <h5>{trip.countries}</h5>
                <h6>{trip.date}</h6>
                {/* <ButtonToolbar className="all-trips-btn-toolbar">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="trip-btn"
                    onClick={() => editTrip(trip.id)}
                  >
                    Edit Trip
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="trip-btn"
                    onClick={() => deleteTrip(trip.id)}
                  >
                    Delete Trip
                  </Button>
                </ButtonToolbar> */}
              </Container>
            );
          })}
        </div>
      )}
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Add Trip
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <AddTrip />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default AllTrips;
