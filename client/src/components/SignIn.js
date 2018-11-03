import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { compose } from "redux";
import CustomInput from "./CustomInput";
import * as actions from "../actions";
// This component represents the signup page
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(formData) {
    //ActionCreater - will manipulate state via auth reducer
    //Signup in this case is the action creator
    await this.props.signInAction(formData);
  }

  helper() {
    console.log(
      "SignIn: helper: isAuthenticated: ",
      this.props.auth.isAuthenticated
    );
    if (this.props.auth.isAuthenticated) {
      console.log(
        "SignIn: helper: has token?: ",
        this.props.auth.jwtToken.length
      );

      return <Redirect to="/tasks" />;
    }
  }

  render() {
    const { handleSubmit } = this.props;

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
          <button type="submit">Sign In</button>
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
  reduxForm({ form: "signin" })
)(SignIn);

//export default reduxForm({ form: "signup" })(SignUp);
