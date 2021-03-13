import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "firebase/auth";
import SignIn from "./SignIn";

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
        {/* <Form inline onSubmit={handleSubmit}>
          <Button type="submit">Login</Button>
        </Form> */}
        <SignIn />
      </Nav>
    </Navbar>
  );
};

export default NavBar;
