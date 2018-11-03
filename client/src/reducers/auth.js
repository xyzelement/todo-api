import { AUTH_SIGNUP, AUTH_SIGNOUT, UPDATE_TASKS } from "../actions/types";
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
      console.log("Auth: AUTH_SIGNUP");
      return {
        ...state,
        jwtToken: action.payload,
        isAuthenticated: true,
        errorMsg: ""
      };
    case AUTH_ERROR:
      console.log("Auth: AUTH_ERROR");
      return {
        ...state,
        jwtToken: "",
        isAuthenticated: false,
        errorMsg: action.payload
      };
    case AUTH_SIGNOUT:
      console.log("Auth: AUTH_SIGNOUT");
      return {
        ...state,
        jwtToken: "",
        isAuthenticated: false
      };
    case GET_TASKS:
      console.log("Auth: AUTH_GET_TASKS");
      return { ...state, tasks: action.payload };
    case UPDATE_TASKS:
      console.log("Auth: UPDATE_TASKS", action.payload);
      var out = { ...state };
      out.tasks = state.tasks.map(item => {
        if (item._id === action.payload.id) {
          return { ...item, done: action.payload.update.done };
        }
        return item;
      });

      return out;

    default:
      return state; // No change to state from weird actions
  }
};
