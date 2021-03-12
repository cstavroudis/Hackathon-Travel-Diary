import React, { useEffect, useState } from "react";
import firebase from "../utils/config";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

// import "./Allentry.css";

// import bootstrap styles

const SingleEntry = (route) => {
  const id = route.match.params.id;
  const [entry, setEntry] = useState([]);
  let history = useHistory();
  const ref = firebase.firestore().collection("entries");

  const getSingleEntry = async (id) => {
    try {
      const doc = await ref.doc(id).get();
      const data = doc.data();
      setEntry(data);
    } catch (error) {
      console.log("There was an error getting single entry:", error);
    }
  };

  const editEntry = (id) => {
    history.push("/editEntry/" + id);
  };

  const deleteEntry = async (id) => {
    try {
      await ref.doc(String(id)).delete();
    } catch (error) {
      console.log(
        "There was an error in deleteEntry func in SingleEntry component:",
        error
      );
    }
  };

  useEffect(() => {
    getSingleEntry(id);
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Jumbotron>
        <h1>{entry.title}</h1>
      </Jumbotron>
      <div>
        <Container className="all-entry-single" key={entry.id}>
          <h4>{entry.location}</h4>
          <h5>{entry.createdAt}</h5>
          <p>{entry.body}</p>
          <ButtonToolbar className="all-entry-btn-toolbar">
            <Button
              variant="secondary"
              size="sm"
              className="entry-btn"
              onClick={() => editEntry(entry.id)}
            >
              Edit Entry
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="entry-btn"
              onClick={() => deleteEntry(entry.id)}
            >
              Delete Entry
            </Button>
          </ButtonToolbar>
        </Container>
      </div>
    </Container>
  );
};

export default SingleEntry;
