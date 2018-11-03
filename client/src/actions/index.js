import axios from "axios";
import { AUTH_SIGNUP } from "./types";
import { AUTH_ERROR } from "./types";
import { GET_TASKS } from "./types";
import { AUTH_SIGNOUT } from "./types";
import { UPDATE_TASKS } from "./types";
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

      localStorage.setItem("JWT_TOKEN", res.data.token);
      dispatch({ type: AUTH_SIGNUP, payload: res.data.token });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is bad?!"
      });
    }
  };
};

export const signOutAction = () => {
  return dispatch => {
    console.log("signOutAction: about to remove TOKEN from local storage");
    localStorage.removeItem("JWT_TOKEN");
    console.log("signOutAction: about to dispatch AUTH_SIGNOUT");
    dispatch({ type: AUTH_SIGNOUT });
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

      console.log("signInAction: about to set TOKEN to local storate");
      localStorage.setItem("JWT_TOKEN", res.data.token);

      console.log("signInAction: about to dispatch: AUTH_SIGNUP");
      dispatch({ type: AUTH_SIGNUP, payload: res.data.token });
    } catch (error) {
      console.log(error);
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is bad?!"
      });
    }
  };
};

export const getTasksAction = token => {
  return async dispatch => {
    try {
      console.log("getTasksAction: TOKEN" + token.length);
      const res = await axios.get("http://localhost:5000/users/tasks", {
        headers: { Authorization: "jwt " + token }
      });
      console.log("getTasksAction: about to dispatch GET_TASKS");
      dispatch({ type: GET_TASKS, payload: res.data.tasks });
    } catch (error) {
      console.log("getTasksAction error", error, token);
    }
  };
};

export const updateTaskAction = (token, id, update) => {
  return async dispatch => {
    try {
      const req = { ...update, id };

      console.log("updateTaskAction: ", token, req);

      const res = await axios.put("http://localhost:5000/users/task", req, {
        headers: { Authorization: "jwt " + token }
      });
      console.log("updateTaskAction: ", req, res);
      dispatch({ type: UPDATE_TASKS, payload: { id, update } });
    } catch (error) {
      console.log("updateTaskAction error", error, token, id, update);
    }
  };
};
