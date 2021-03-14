import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
// import ButtonToolbar from "react-bootstrap/ButtonToolbar";

const SingleTrip = ({ trip }) => {
  // const [trips, trip] = useState(isDone);
  // const firestore = useFirestore();
  // const { uid } = useSelector((state) => state.firebase.auth);
  console.log("trip:", trip);

  ////// ADD DELETE TRIP ///////

  return (
    <Container className="all-trips-single" key={trip.tripId}>
      <Link to={`/trips/${trip.tripId}/entries`}>
        <h2>{trip.title}</h2>
      </Link>
      <h5>{trip.countries}</h5>
      <h6>{trip.date}</h6>
      {/* <ButtonToolbar className="all-entries-btn-toolbar">
        <Button
          variant="secondary"
          size="sm"
          className="entry-btn"
          // onClick={() => deleteEntry(entry.id)}
        >
          Delete Entry
        </Button>
      </ButtonToolbar> */}
    </Container>
  );
};
export default SingleTrip;
