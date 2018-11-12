import { GET_SPRINTS, ADD_SPRINT, STOP_SPRINT } from "./types";

const DEFAULT_STATE = {
  sprints: [],
  current: undefined
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_SPRINTS:
      console.log("Auth: GET_SPRINTS", action.payload);
      var out_sprints = { ...state, sprints: action.payload };
      if (
        out_sprints.sprints.length === 0 ||
        out_sprints.sprints[out_sprints.sprints.length - 1].end
      ) {
        out_sprints.current = undefined;
      } else {
        out_sprints.current =
          out_sprints.sprints[out_sprints.sprints.length - 1];
      }
      return out_sprints;

    case ADD_SPRINT:
      console.log("Auth: ADD_SPRINT", action.payload);
      let out_add_sprint = { ...state, sprints: [...state.sprints] };
      out_add_sprint.sprints.push(action.payload);
      out_add_sprint.current = action.payload;

      return out_add_sprint;

    case STOP_SPRINT:
      console.log("Auth: STOP_SPRINT", action.payload);
      var out_stop = { ...state };
      out_stop.sprints = [...state.sprints];
      out_stop.sprints[out_stop.sprints.length - 1] = {
        ...out_stop.sprints[out_stop.sprints.length - 1]
      };
      out_stop.sprints[out_stop.sprints.length - 1].end = action.payload;
      out_stop.current = undefined;
      return out_stop;
    default:
      return state; // No change to state from weird actions
  }
};
