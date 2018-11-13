import * as actions from "../../src/actions/sprint_actions";

import mockAxios from "axios";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

//https://medium.com/@kilgarenone/use-jest-to-test-redux-async-action-creator-with-axios-in-a-create-react-app-app-d9c9b52eba5e

describe("Sprint actions", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  it("Gets the sprints and call reducer with GET_SPRINTS", async () => {
    const mockData = {
      sprints: [
        { start: "Mon Nov 12 2018 12:51:11 GMT-0500 (Eastern Standard Time)" },
        { start: "Mon Nov 12 2018 12:52:23 GMT-0500 (Eastern Standard Time)" }
      ]
    };
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockData })
    );

    await store.dispatch(actions.getSprintsAction("some_token"));
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    expect(store.getActions()).toEqual([
      {
        payload: [{ start: expect.any(Date) }, { start: expect.any(Date) }],
        type: "GET_SPRINTS"
      }
    ]);
  });
});
