import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import sprintReducer from "./sprint_reducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  sprints: sprintReducer
});
