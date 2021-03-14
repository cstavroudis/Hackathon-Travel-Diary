import React from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import AddEntry from "./AddEntry";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

import "./AllEntries.css";

const AllEntries = (route) => {
  const tripId = route.match.params.id;
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  console.log("tripId:", tripId);
  useFirestoreConnect({
    collection: `users/${uid}/trips/${tripId}/entries`,
    storeAs: "entries",
  });
  // useFirestoreConnect({
  //   collection: `users/${uid}/trips/${tripId}`,
  //   storeAs: "trip",
  // });

  // const trip = useSelector((state) => state.firestore.data.trip);
  const entries = useSelector((state) => state.firestore.data.entries);

  // console.log("trip:", trip);

  console.log("entries:", entries);

  return (
    <Container>
      <Jumbotron>
        {/* {trip ? (
          <h1>{trip[0].title} Journal Entries</h1>
        ) : (
          <h1>Journal Entries</h1>
        )} */}
        <h1>{displayName}'s Journal Entries</h1>
      </Jumbotron>

      {!entries ? (
        <div>Add your first journal entry here.</div>
      ) : (
        <div>
          {Object.values(entries).map((entry) => {
            return (
              <Container className="all-entries-single" key={entry.id}>
                <Link to={`/entries/${tripId}/entries/${entry.id}`}>
                  <h2>{entry.title}</h2>
                </Link>
                <h4>{entry.location}</h4>
                <h5>{entry.createdAt}</h5>
                <p>{entry.body}</p>
                <ButtonToolbar className="all-entries-btn-toolbar">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="entry-btn"
                    // onClick={() => editEntry(entry.id)}
                  >
                    Edit Entry
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="entry-btn"
                    // onClick={() => deleteEntry(entry.id)}
                  >
                    Delete Entry
                  </Button>
                </ButtonToolbar>
              </Container>
            );
          })}
        </div>
      )}
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Add Entry
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <AddEntry tripId={tripId} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default AllEntries;
