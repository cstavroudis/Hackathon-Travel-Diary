import React, { useEffect, useState } from "react";
import firebase from "../utils/config";
import { Link, useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

import "./AllEntries.css";

// import bootstrap styles

function AllEntries() {
  const [entries, setEntries] = useState([]);
  let history = useHistory();
  const ref = firebase.firestore().collection("entries");

  const getAllEntries = () => {
    ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      console.log("list:", list);
      setEntries(list);
    });
  };

  const editEntry = (id) => {
    history.push("/editEntry/" + id);
  };

  const deleteEntry = async (id) => {
    try {
      await ref.doc(String(id)).delete();
    } catch (error) {
      console.log(
        "There was an error in deleteEntry func in AllEntries component:",
        error
      );
    }
  };

  useEffect(() => {
    getAllEntries();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Jumbotron>
        <h1>My Journal Entries</h1>
        <Link to="/addEntry">
          <Button>Add New Entry</Button>
        </Link>
      </Jumbotron>

      {entries.length < 1 ? (
        <div>Add your first journal entry here.</div>
      ) : (
        <div>
          {entries.map((entry) => {
            return (
              <div key={entry.id}>
                <h2>{entry.title}</h2>
                <h4>{entry.location}</h4>
                <h5>{entry.createdAt}</h5>
                <p>{entry.body}</p>
                <ButtonToolbar className="all-entries-btn-toolbar">
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
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
}

export default AllEntries;
