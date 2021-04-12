import React, { useSelector } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  useFirebase,
  actionTypes,
  // unWatchUserProfile,
  createFirebaseInstance,
} from "react-redux-firebase";
import { useHistory } from "react-router-dom";

function unWatchUserProfile(firebase) {
  const {
    authUid,
    config: { userProfile, useFirestoreForProfile },
  } = firebase._;
  if (!firebase._.profileWatch) {
    return;
  }
  if (useFirestoreForProfile && firebase.firestore) {
    // Call profile onSnapshot unsubscribe stored on profileWatch
    firebase._.profileWatch();
  } else if (userProfile && firebase.database) {
    firebase
      .database()
      .ref()
      .child(`${userProfile}/${authUid}`)
      .off("value", firebase._.profileWatch);
  }
  firebase._.profileWatch = null;
}

const logout = (dispatch, firebase) => {
  console.log("in logout");
  console.log("dispatch:", dispatch);
  // unWatchUserProfile(firebase);
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const action = {
        type: actionTypes.LOGOUT,
      };
      if (firebase._.config.preserveOnLogout) {
        action.preserve = firebase._.config.preserveOnLogout;
      }
      const clearData = {
        type: actionTypes.CLEAR_DATA,
      };
      dispatch(action);
      // dispatch(clearData);
      firebase._.authUid = null;
      return firebase;
    });
};

const LogOut = (props) => {
  console.log("Props in logout: ", props);
  const firebase = useFirebase();
  const history = useHistory();
  const handleClick = async (event) => {
    event.preventDefault();
    logout(props.dispatch, firebase);
    history.push("/");
  };

  return (
    <Form inline>
      <Button size="sm" onClick={handleClick}>
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
