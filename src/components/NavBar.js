import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "firebase/auth";
import SignIn from "./SignIn";
import LogOut from "./LogOut";
import { connect } from "react-redux";

const NavBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Travel Journal
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/trips">
          Trips
        </Nav.Link>
        {props.firebase.auth.email ? <LogOut /> : <SignIn />}
      </Nav>
    </Navbar>
  );
};

const mapState = (state) => {
  console.log("state.firebase:", state.firebase);
  return {
    firebase: state.firebase,
  };
};
export default connect(mapState)(NavBar);
