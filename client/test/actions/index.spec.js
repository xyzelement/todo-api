import * as actions from "../../src/actions/index";
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

describe("Index (actions)", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  let store = undefined;

  beforeEach(() => {
    store = mockStore();
  });

  it("signUpAction hits /users/signup, sets local token and triggers AUTH_SIGNUP", async () => {
    //TODO: this action should universally be SIGNIN not SIGNUP
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { token: "some_token" } })
    );

    await store.dispatch(
      actions.signUpAction({ email: "email", password: "pass" })
    );

    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://localhost:/users/signup",
      { email: "email", password: "pass" }
    );

    //TODO: check local storage mock

    expect(store.getActions()).toEqual([
      {
        type: "AUTH_SIGNUP",
        payload: "some_token"
      }
    ]);
  });

  it("signOutAction clears local token and triggers AUTH_SIGNOUT", async () => {
    //TODO: check local storage clearing
    await store.dispatch(actions.signOutAction());
    expect(store.getActions()).toEqual([
      {
        type: "AUTH_SIGNOUT"
      }
    ]);
  });

  it("signInAction hits /users/signin, sets local token and triggers AUTH_SIGNUP", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { token: "some_token" } })
    );

    await store.dispatch(
      actions.signInAction({ email: "email", password: "pass" })
    );

    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://localhost:/users/signin",
      { email: "email", password: "pass" }
    );

    //TODO: check local storage mock

    expect(store.getActions()).toEqual([
      {
        type: "AUTH_SIGNUP",
        payload: "some_token"
      }
    ]);
  });

  //TODO: this should be a different action file and different test file

  it("getTasksAction hits /users/tasks, parses sprint Dates and calls GET TASKS", async () => {
    //TODO: either test the sorting or - better - move that to another file
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          tasks: [
            { done: false, star: true },
            { done: true, star: false },
            { done: false, star: false },
            { done: false, star: false },
            {
              done: true,
              star: true,
              sprint:
                "Mon Nov 12 2018 15:06:19 GMT-0500 (Eastern Standard Time)"
            }
          ]
        }
      })
    );

    await store.dispatch(actions.getTasksAction("some_token"));

    expect(mockAxios.get).toHaveBeenCalledWith(
      "http://localhost:/users/tasks",
      { headers: { Authorization: "jwt some_token" } }
    );

    expect(store.getActions()).toEqual([
      {
        type: "GET_TASKS",
        payload: [
          { done: false, star: true },
          { done: false, star: false },
          { done: false, star: false },
          {
            done: true,
            star: true,
            sprint: expect.any(Date)
          },
          { done: true, star: false }
        ]
      }
    ]);
  });

  it("updateTaskAction hits /users/task PUT with id as part of request and calls UPDATE_TASKS", async () => {
    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({ data: { saved: { action: "UPDATED_1234" } } })
    );

    await store.dispatch(
      actions.updateTaskAction("some_token", "idABCD", { action: "1234" })
    );

    expect(mockAxios.put).toHaveBeenCalledWith(
      "http://localhost:/users/task",
      { id: "idABCD", action: "1234" },
      { headers: { Authorization: "jwt some_token" } }
    );

    expect(store.getActions()).toEqual([
      {
        // TODO: UPDATE_TASK would be a better name
        type: "UPDATE_TASKS",
        // TODO: Maybe these payload types aren't as consistent across actions as they could be
        // TODO: This test captures the fact that the return value isn't echoed back in the action
        //       But that should either be changed or we don't even return that at all
        payload: { id: "idABCD", update: { action: "1234" } }
      }
    ]);
  });

  it("addTaskAction hits /users/task POST and calls ADD_TASK", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: { saved: { action: "1234" } } })
    );

    await store.dispatch(
      actions.addTaskAction("some_token", { action: "1234" })
    );

    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://localhost:/users/task",
      { action: "1234" },
      { headers: { Authorization: "jwt some_token" } }
    );

    expect(store.getActions()).toEqual([
      {
        type: "ADD_TASK",
        payload: { action: "1234" }
      }
    ]);
  });

  it("deleteTaskAction hits /users/task DELETE based on id and calls DELETE_TASK", async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({ id: "1234" })
    );

    await store.dispatch(actions.deleteTaskAction("some_token", "1234"));

    expect(mockAxios.delete).toHaveBeenCalledWith(
      "http://localhost:/users/task",
      { data: { id: "1234" }, headers: { Authorization: "jwt some_token" } }
    );

    expect(store.getActions()).toEqual([
      {
        type: "DELETE_TASK",
        payload: { id: "1234" }
      }
    ]);
  });
});
