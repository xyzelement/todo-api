import { GET_SPRINTS, ADD_SPRINT, STOP_SPRINT } from "../actions/types";

const DEFAULT_STATE = {
  sprints: [],
  current: undefined
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_SPRINTS:
      console.log("Auth: GET_SPRINTS", action.payload);
      var out_sprints = { ...state, sprints: action.payload };
      //TODO: set current sprint here, if any
      return out_sprints;

    case ADD_SPRINT:
      console.log("Auth: ADD_SPRINT", action.payload);
      var out_add_sprint = { ...state, sprints: [...state.sprints] };
      out_add_sprint.sprints.push(action.payload);
      console.log(out_add_sprint);
      return out_add_sprint;

    case STOP_SPRINT:
      console.log("Auth: STOP_SPRINT", action.payload);
      var out_stop = { ...state };
      out_stop.sprints = [...state.sprints];
      out_stop.sprints[out_stop.sprints.length - 1] = {
        ...out_stop.sprints[out_stop.sprints.length - 1]
      };
      out_stop.sprints[out_stop.sprints.length - 1].end = action.payload;
      return out_stop;
    default:
      return state; // No change to state from weird actions
  }
};
