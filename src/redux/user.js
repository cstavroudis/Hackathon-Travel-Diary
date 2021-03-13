import firebase from "../utils/config";
import "firebase/auth";

// ACTION TYPE
const SET_USER = "SET_USER";

// ACTION CREATOR
export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

// THUNK
export const fetchUser = (provider) => {
  return async (dispatch) => {
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      console.log("Google signIn credential:", credential);
      console.log("Google signIn token:", token);
      console.log("Google signIn user:", user);
      dispatch(setUser(user));
    } catch (error) {
      console.log("there was an error in fetchUser thunk");
    }
  };
};

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
