// all types of actions
export const AUTH_SIGNUP = "AUTH_SIGNUP";
export const AUTH_ERROR = "AUTH_ERROR";
export const AUTH_SIGNOUT = "AUTH_SIGNOUT";

export const UPDATE_TASKS = "UPDATE_TASKS";
export const GET_TASKS = "GET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const GET_SPRINTS = "GET_SPRINTS";
export const ADD_SPRINT = "ADD_SPRINT";
export const STOP_SPRINT = "STOP_SPRINT";

var host = window.location.hostname;
var port = window.location.port;

if (host === "localhost" && port === "3000") {
  // Running in 2-server development configuration
  // Web: 3000, API: 5000
  host = "http://localhost:5000";
} else {
  // Running in single-server prod-like setup
  //TODO may need to distinguish prod vs prod-like
  host = window.location.protocol + "//" + host + ":" + port;
}

export const HOST = host;
