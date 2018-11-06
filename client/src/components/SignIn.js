import React, { Component } from "react";
import { Field } from "redux-form";

import { Redirect } from "react-router-dom";

import CustomInput from "./CustomInput";

// This component represents the signup page
export default class SignIn extends Component {
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
    if (this.props.auth.isAuthenticated) {
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
