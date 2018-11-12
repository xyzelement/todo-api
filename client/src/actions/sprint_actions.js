import axios from "axios";
import { GET_SPRINTS, ADD_SPRINT, STOP_SPRINT } from "./types";
import { HOST } from "./types";

export const getSprintsAction = token => {
  return async dispatch => {
    try {
      let res = await axios.get(HOST + "/sprints", {
        headers: { Authorization: "jwt " + token }
      });

      res.data.sprints = res.data.sprints.map(sp => {
        return { ...sp, start: new Date(sp.start) };
      });
      dispatch({
        type: GET_SPRINTS,
        payload: res.data.sprints
      });
    } catch (error) {
      console.log("getSprintsAction error", error, token);
    }
  };
};

export const addSprintAction = token => {
  return async dispatch => {
    try {
      let res = await axios.post(
        HOST + "/sprints",
        {},
        {
          headers: { Authorization: "jwt " + token }
        }
      );
      res.data.saved.start = new Date(res.data.saved.start);
      dispatch({
        type: ADD_SPRINT,
        payload: res.data.saved
      });
    } catch (error) {
      console.log("addSprintAction error", error, token);
    }
  };
};

export const stopSprintAction = (token, id) => {
  return async dispatch => {
    try {
      const res = await axios.put(
        HOST + "/sprints",
        { id },
        {
          headers: { Authorization: "jwt " + token }
        }
      );
      dispatch({
        type: STOP_SPRINT,
        payload: res.data.end
      });
    } catch (error) {
      console.log("addSprintAction error", error, token);
    }
  };
};
