import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
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

    //TODO: I suspect this is the worst place to be calling this form
    await this.props.getTasksAction(formData);
  }

  helper() {
    return this.props.tasks ? (
      <b>There are {this.props.tasks.length} tasks</b>
    ) : (
      <b />
    );
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
  return { tasks: state.auth.tasks };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(SignIn);

//export default reduxForm({ form: "signup" })(SignUp);
