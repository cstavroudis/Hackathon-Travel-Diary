import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const SingleTrip = ({ trip }) => {
  // const [trips, trip] = useState(isDone);
  // const firestore = useFirestore();
  // const { uid } = useSelector((state) => state.firebase.auth);
  console.log("trip:", trip);

  ////// ADD DELETE AND EDIT ///////

  // const handleChange = (event) => {
  //   if (event.currentTarget.type === "checkbox") {
  //     trip(!isSingleTripDone);
  //     firestore
  //       .collection("users")
  //       .doc(uid)
  //       .collection("trips")
  //       .doc(tripId)
  //       .update({
  //         isDone: !isSingleTripDone,
  //       });
  //   }
  // };

  return (
    <Container className="all-trips-single" key={trip.tripId}>
      <Link to={`/trips/${trip.id}/entries`}>
        <h2>{trip.title}</h2>
      </Link>
      <h5>{trip.countries}</h5>
      <h6>{trip.date}</h6>
    </Container>
  );
};
export default SingleTrip;
