const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

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

firebase.firestore.setLogLevel("debug");

module.exports = firebase;
