import React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LogOut = (props) => {
  console.log("Props in logout: ", props);
  return (
    <Form inline>
      <Button
        size="sm"
        onClick={(event) => {
          event.preventDefault();
          props.firebase.logout();
        }}
      >
        Log Out
      </Button>
    </Form>
  );
};

const mapState = (state) => {
  console.log("state.firebase:", state.firebase);
  return {
    firebase: state.firebase,
  };
};
export default connect(mapState)(LogOut);
