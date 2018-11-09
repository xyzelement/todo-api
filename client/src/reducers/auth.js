import {
  AUTH_ERROR,
  AUTH_SIGNUP,
  AUTH_SIGNOUT,
  UPDATE_TASKS,
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  GET_SPRINTS
} from "../actions/types";

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
          return { ...item, ...action.payload.update };
        }
        return item;
      });

      return out;

    case ADD_TASK:
      console.log("Auth: ADD_TASK", action.payload);
      var out_state = { ...state };
      out_state.tasks = [...state.tasks];
      out_state.tasks.push(action.payload);
      return out_state;

    case DELETE_TASK:
      console.log("Auth: DELETE_TASK", action.payload);
      var out_delete_state = { ...state };
      out_delete_state.tasks = state.tasks.filter(item => {
        return item._id !== action.payload.id;
      });
      return out_delete_state;

    case GET_SPRINTS:
      console.log("Auth: GET_SPRINTS", action.payload);
      var out_sprints = { ...state, sprints: action.payload };
      return out_sprints;

    default:
      return state; // No change to state from weird actions
  }
};
