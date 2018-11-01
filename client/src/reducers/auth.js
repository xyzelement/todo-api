import { AUTH_SIGNUP } from "../actions/types";
import { AUTH_ERROR } from "../actions/types";
import { GET_TASKS } from "../actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  jwtToken: "",
  errorMsg: ""
};

// Ait, takes state and action, goes through actions
// and figures out how the action manipulates the state
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGNUP:
      // process it
      return {
        ...state,
        jwtToken: action.payload,
        isAuthenticated: true,
        errorMsg: ""
      };
    case AUTH_ERROR:
      return {
        ...state,
        jwtToken: "",
        isAuthenticated: false,
        errorMsg: action.payload
      };
    case GET_TASKS:
      return { ...state, tasks: action.payload };
    default:
      return state; // No change to state from weird actions
  }
};