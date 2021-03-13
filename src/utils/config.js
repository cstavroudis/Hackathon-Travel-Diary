import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// const firebase = require("firebase/app");
// require("firebase/firestore");
// require("firebase/auth");

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: "G-J9XV4DX1PD",
// };

const firebaseConfig = {
  apiKey: "AIzaSyB8aP5sgJr3jpIKWNjuB80Zd72g8yvHjBc",
  authDomain: "hackathon-45a65.firebaseapp.com",
  projectId: "hackathon-45a65",
  storageBucket: "hackathon-45a65.appspot.com",
  messagingSenderId: "850378170675",
  appId: "1:850378170675:web:99472abc5e772192d21e46",
  measurementId: "G-J9XV4DX1PD",
};

firebase.initializeApp(firebaseConfig);

// firebase.firestore.setLogLevel("debug");

// module.exports = firebase;

export default firebase;
