import React from "react";
import { connect } from "react-redux";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "../../src/components/SignIn";
import { reduxForm } from "redux-form";
import { mountWithState } from "enzyme-redux";

//enzyme.configure({ adapter: new Adapter() });
Enzyme.configure({ adapter: new Adapter() });

describe("Testing SignIn", () => {
  it("onSubmit gets called at all", () => {
    const mapStateToProps = state => ({
      auth: state.auth
    });

    const m = jest.fn();
    SignIn.prototype.onSubmit = m;
    const SignInForm = reduxForm({ form: "signin" })(SignIn);

    const ConnectedComponent = connect(mapStateToProps)(SignInForm);

    const wrapper = mountWithState(<ConnectedComponent />, {
      auth: { isAuthenticated: false }
    });
    const form = wrapper.find("form");

    expect(m.mock.calls.length).toBe(0);
    form.simulate("submit");
    expect(m.mock.calls.length).toBe(1);
  });
});
