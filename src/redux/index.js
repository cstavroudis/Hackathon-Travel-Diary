import { combineReducers } from "redux";
import userReducer from "./user";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const appReducer = combineReducers({
  user: userReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  // students: studentsReducer,
  // campus: campusReducer,
  // student: studentReducer,
});

export default appReducer;
