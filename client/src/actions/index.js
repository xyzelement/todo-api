import axios from "axios";
import { AUTH_SIGNUP } from "./types";
import { AUTH_ERROR } from "./types";
import { GET_TASKS } from "./types";
/*
    Redux handles all this:
    ActionCreatrs => create/return Actions -> dispatched -> Middlewares -> reducers
    The actions can have access to dispatchers?
*/

export const signUpAction = formData => {
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

export const signInAction = formData => {
  return async dispatch => {
    try {
      // formData has the right fields because of how form fields are named
      const res = await axios.post(
        "http://localhost:5000/users/signin",
        formData
      );

      dispatch({ type: AUTH_SIGNUP, payload: res.data.token });
      localStorage.setItem("JWT_TOKEN", res.data.token);
    } catch (error) {
      console.log(error);
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is bad?!"
      });
    }
  };
};

export const getTasksAction = formData => {
  return async dispatch => {
    try {
      const res = await axios.get("http://localhost:5000/users/tasks", {
        headers: { Authorization: "jwt " + localStorage.getItem("JWT_TOKEN") }
      });
      dispatch({ type: GET_TASKS, payload: res.data.tasks });
    } catch (error) {
      console.log("error here", error);
    }
  };
};
