import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  apiKey: "AIzaSyANUK4kivghLdWUW1s6pVOnz3wyT4clpfM",
  authDomain: "stackathon-travel-diary.firebaseapp.com",
  projectId: "stackathon-travel-diary",
  storageBucket: "stackathon-travel-diary.appspot.com",
  messagingSenderId: "997446907659",
  appId: "1:997446907659:web:f7f5eb3b8fe8545c66940e",
  measurementId: "G-1WTVR2KDQG",
};

firebase.initializeApp(firebaseConfig);

// firebase.firestore.setLogLevel("debug");

export default firebase;
