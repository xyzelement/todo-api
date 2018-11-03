import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import CustomInput from "./CustomInput";
import * as actions from "../actions";
import { Redirect } from "react-router-dom";

// This component represents the signup page
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // This is simply our onSubmit callback, where
  // we're going to actually call the API
  async onSubmit(formData) {
    //ActionCreater - will manipulate state via auth reducer
    //Signup in this case is the action creator
    await this.props.signUpAction(formData);
  }

  helper() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/tasks" />;
    }
  }

  render() {
    // This, I don't quite understand. For some reason we
    // need to use handleSubmit from redux-form instead of
    // calling onSubmit directly.
    const { handleSubmit } = this.props;

    // Using my own CustomInput component because I want to assign
    // CSS classes to it later...
    return (
      <div>
        <b>{this.helper()}</b>
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

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
