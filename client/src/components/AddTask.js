import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import CustomInput from "./CustomInput";
import * as actions from "../actions";
import { connect } from "react-redux";
import { compose } from "redux";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(formData) {
    //ActionCreater - will manipulate state via auth reducer
    //Signup in this case is the action creator
    //await this.props.signUpAction(formData);
    console.log("AddTask: onSubmit", formData);
    await this.props.addTaskAction(this.props.auth.jwtToken, formData);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <Field
              name="action"
              type="text"
              id="action"
              label="Action"
              placeholder="Do This"
              component={CustomInput}
            />
          </fieldset>

          <button type="submit">Add It</button>
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
  reduxForm({ form: "addtask" })
)(AddTask);
