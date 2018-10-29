import axios from "axios";
import { AUTH_SIGNUP } from "./types";
import { AUTH_ERROR } from "./types";
/*
    Redux handles all this:
    ActionCreatrs => create/return Actions -> dispatched -> Middlewares -> reducers
    The actions can have access to dispatchers?
*/

export const signUp = formData => {
  return async dispatch => {
    /*
        Step 1: use formData to make http req to backend 
        Step 2: take backend response (jwtToken)
        Step 3: dispatch user signed up message (jwt)
        Step 4: save token to localStorage (for react/storage)
    */
    try {
      // formData has the right fields because of how form fields are named
      const res = await axios.post(
        "http://localhost:5000/users/signup",
        formData
      );

      dispatch({ type: AUTH_SIGNUP, payload: res.data.token });
      localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is bad?!"
      });
    }
  };
};
