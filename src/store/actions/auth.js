import * as actionTypes from "./actionTypes";

import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    // authenticate user
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDeXEA4anJVICZ4R6JodqKZdUM99Y0js0Q";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDeXEA4anJVICZ4R6JodqKZdUM99Y0js0Q";
    }
    axios
      .post(url, authData)
      .then(response => {
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
        dispatch(authFail());
      });
  };
};
