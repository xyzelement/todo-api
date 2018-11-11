import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import sprintReducer from "../actions/sprint_reducer";

// A reducer is a pure function that takes the previous
// state and action and returns the next state.
export default combineReducers({
  // I guess this is just wiring up the magical redux-form
  // reducer. Whenever the action "form" happens, the
  // reducer takes care of state transitions for us? Maybe?
  form: formReducer,
  auth: authReducer,
  sprints: sprintReducer
});
