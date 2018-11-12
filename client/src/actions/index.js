import axios from "axios";
import { AUTH_SIGNUP } from "./types";
import { AUTH_ERROR } from "./types";
import { GET_TASKS } from "./types";
import { AUTH_SIGNOUT } from "./types";
import { UPDATE_TASKS, ADD_TASK, DELETE_TASK } from "./types";

import { HOST } from "./types";

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
      const res = await axios.post(HOST + "/users/signup", formData);

      localStorage.setItem("JWT_TOKEN", res.data.token);
      dispatch({ type: AUTH_SIGNUP, payload: res.data.token });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error
      });
    }
  };
};

export const signOutAction = () => {
  return dispatch => {
    localStorage.removeItem("JWT_TOKEN");
    dispatch({ type: AUTH_SIGNOUT });
  };
};

export const signInAction = formData => {
  return async dispatch => {
    try {
      // formData has the right fields because of how form fields are named
      const res = await axios.post(HOST + "/users/signin", formData);

      localStorage.setItem("JWT_TOKEN", res.data.token);

      dispatch({ type: AUTH_SIGNUP, payload: res.data.token });
    } catch (error) {
      console.log(error);
      dispatch({
        type: AUTH_ERROR,
        payload: error
      });
    }
  };
};

export const getTasksAction = token => {
  return async dispatch => {
    try {
      const res = await axios.get(HOST + "/users/tasks", {
        headers: { Authorization: "jwt " + token }
      });
      dispatch({
        type: GET_TASKS,
        payload: res.data.tasks
          .sort((a, b) => {
            if (a.done === b.done) {
              if (a.star === b.star) {
                return 0;
              } else {
                return b.star;
              }
            } else {
              return a.done;
            }
          })
          .map(task => {
            if (task.sprint) {
              return { ...task, sprint: new Date(task.sprint) };
            }

            return task;
          })
      });
    } catch (error) {
      console.log("getTasksAction error", error, token);
    }
  };
};

export const updateTaskAction = (token, id, update) => {
  return async dispatch => {
    try {
      const req = { ...update, id };

      //TODO - check response const res =
      await axios.put(HOST + "/users/task", req, {
        headers: { Authorization: "jwt " + token }
      });
      dispatch({ type: UPDATE_TASKS, payload: { id, update } });
    } catch (error) {
      console.log("updateTaskAction error", error, token, id, update);
    }
  };
};

export const addTaskAction = (token, update) => {
  return async dispatch => {
    try {
      const res = await axios.post(HOST + "/users/task", update, {
        headers: { Authorization: "jwt " + token }
      });

      if (res.data.saved) {
        dispatch({ type: ADD_TASK, payload: res.data.saved });
      } else {
        console.log("addTaskAction DID NOT SAVE", res);
      }
    } catch (error) {
      console.log("addTaskAction error", error, token, update);
    }
  };
};

export const deleteTaskAction = (token, id) => {
  return async dispatch => {
    try {
      //TODO - check response const res =
      await axios.delete(HOST + "/users/task", {
        data: { id },
        headers: { Authorization: "jwt " + token }
      });
      dispatch({ type: DELETE_TASK, payload: { id } });
    } catch (error) {
      console.log("deleteTaskAction error", error, token, id);
    }
  };
};
