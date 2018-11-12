import auth from "../../src/actions/auth";

import { AUTH_SIGNUP } from "../../src/actions/types";

describe("AUTH Reducer", () => {
  it("has a default state", () => {
    expect(auth(undefined, { type: "CRAZY" })).toEqual({
      isAuthenticated: false,
      jwtToken: "",
      errorMsg: ""
    });
  });

  it("Can process AUTH_SIGNUP", () => {
    expect(auth(undefined, { type: "AUTH_SIGNUP", payload: "token" })).toEqual({
      isAuthenticated: true,
      jwtToken: "token",
      errorMsg: ""
    });
  });
});
