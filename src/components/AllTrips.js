import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import AddTrip from "./AddTrip";
import SingleTrip from "./SingleTrip";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

// import "./AllTrips.css";

const AllTrips = () => {
  // const [trips, setTrips] = useState([]);
  // const ref = firebase.firestore().collection("trips");

  // const getAllTrips = () => {
  //   ref.onSnapshot((querySnapshot) => {
  //     const list = [];
  //     querySnapshot.forEach((doc) => {
  //       list.push(doc.data());
  //     });
  //     console.log("list:", list);
  //     setTrips(list);
  //   });
  // };

  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  useFirestoreConnect({
    collection: `users/${uid}/trips`,
    storeAs: "trips",
  });
  const trips = useSelector((state) => state.firestore.data.trips);
  console.log("trips:", trips);

  return (
    <Container>
      <Jumbotron>
        <h1>{displayName}'s Trips</h1>
      </Jumbotron>

      {!trips ? (
        <div>Add your first trip here.</div>
      ) : (
        <div>
          {Object.values(trips).map((trip) => {
            return <SingleTrip key={trip.tripId} trip={trip} />;
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
