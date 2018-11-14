import auth from "../../src/actions/auth";

import {
  AUTH_SIGNUP,
  AUTH_ERROR,
  AUTH_SIGNOUT,
  GET_TASKS,
  UPDATE_TASKS,
  ADD_TASK,
  DELETE_TASK
} from "../../src/actions/types";

describe("AUTH Reducer", () => {
  it("Weird action doesn't alter default state", () => {
    expect(auth(undefined, { type: "CRAZY" })).toEqual({
      isAuthenticated: false,
      jwtToken: "",
      errorMsg: ""
    });
  });

  it("AUTH_SIGNUP sets TOKEN and AUTHENTICATION", () => {
    expect(auth(undefined, { type: AUTH_SIGNUP, payload: "token" })).toEqual({
      isAuthenticated: true,
      jwtToken: "token",
      errorMsg: ""
    });
  });

  it("AUTH_ERROR clears token and isAuthenticated, sets errorMsg", () => {
    expect(auth(undefined, { type: AUTH_ERROR, payload: "the error" })).toEqual(
      {
        isAuthenticated: false,
        jwtToken: "",
        errorMsg: "the error"
      }
    );
  });

  it("AUTH_SIGNOUT clears token, isAuthenticated and errorMsg", () => {
    expect(auth(undefined, { type: AUTH_SIGNOUT })).toEqual({
      isAuthenticated: false,
      jwtToken: "",
      errorMsg: ""
    });
  });

  //TODO: different file

  it("GET_TASKS sets state.tasks to payload", () => {
    expect(auth({}, { type: GET_TASKS, payload: [1, 2, 3] })).toEqual({
      tasks: [1, 2, 3]
    });
  });

  it("UPDATE_TASKS updates one member of state.tasks to payload.update by payload.id", () => {
    //TODO: should be called UPDATE_TASK
    expect(
      auth(
        { tasks: [{ _id: 1, action: "aaa" }, { _id: 2, action: "bbb" }] },
        { type: UPDATE_TASKS, payload: { id: 2, update: { action: "ccc" } } }
      )
    ).toEqual({
      tasks: [{ _id: 1, action: "aaa" }, { _id: 2, action: "ccc" }]
    });
  });

  it("ADD_TASK appends action.payload to state.tasks", () => {
    expect(
      auth(
        { tasks: [{ _id: 1, action: "aaa" }] },
        { type: ADD_TASK, payload: { _id: 3, action: "ccc" } }
      )
    ).toEqual({
      tasks: [{ _id: 1, action: "aaa" }, { _id: 3, action: "ccc" }]
    });
  });

  it("DELETE_TASK removes task matching action.payload.id", () => {
    expect(
      auth(
        { tasks: [{ _id: 1, action: "aaa" }] },
        { type: DELETE_TASK, payload: { id: 1 } }
      )
    ).toEqual({
      tasks: []
    });
  });
});
