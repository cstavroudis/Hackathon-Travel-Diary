import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const appReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  // students: studentsReducer,
  // campus: campusReducer,
  // student: studentReducer,
});

export default appReducer;
