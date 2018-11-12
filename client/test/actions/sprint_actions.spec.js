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
      sprints: [1, 2, 3]
    };
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: mockData })
    );

    await store.dispatch(actions.getSprintsAction("some_token"));
    expect(mockAxios.get).toHaveBeenCalledTimes(1);

    expect(store.getActions()).toEqual([
      {
        payload: [1, 2, 3],
        type: "GET_SPRINTS"
      }
    ]);
  });
});
