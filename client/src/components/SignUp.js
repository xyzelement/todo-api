import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import CustomInput from "./CustomInput";
import * as actions from "../actions";
// This component represents the signup page
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // This is simply our onSubmit callback, where
  // we're going to actually call the API
  async onSubmit(formData) {
    console.log("onSubmit() called");
    console.log(formData);

    //ActionCreater - will manipulate state via auth reducer
    //Signup in this case is the action creator
    await this.props.signUp(formData);
  }

  // This returns the JSX which is like a templating thing
  // and JS budled together.
  render() {
    // This, I don't quite understand. For some reason we
    // need to use handleSubmit from redux-form instead of
    // calling onSubmit directly.
    const { handleSubmit } = this.props;

    // Using my own CustomInput component because I want to assign
    // CSS classes to it later...
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <Field
              name="email"
              type="text"
              id="email"
              label="what's your email"
              placeholder="ed@ed.ed?"
              component={CustomInput}
            />
          </fieldset>
          <fieldset>
            <Field
              name="password"
              type="password"
              id="password"
              label="what's your password"
              placeholder="ed"
              component={CustomInput}
            />
          </fieldset>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

// This just means that what this module ultimately exports
// is not the SignUp class but a reduxForm based on this
// class. Then we're saying that "signup" is
// "the name of your form and the key to where your form's
// state will be mounted under the redux-form reducer"
export default compose(
  connect(
    null,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);

//export default reduxForm({ form: "signup" })(SignUp);
