import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const signInWithGoogle = async () => {
    try {
      await firebase.login({
        provider: "google",
        type: "popup",
      });
      history.push("/trips");
    } catch (error) {
      console.log("issue signing in with google");
    }
  };
  return (
    <Form inline>
      <Button
        size="sm"
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </Button>
    </Form>
  );
};
export default SignIn;
