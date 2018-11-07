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
    const { reset } = this.props;

    if (this.props.context) formData.context = [this.props.context];
    await this.props.addTaskAction(this.props.auth.jwtToken, formData);
    reset();
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form className="add-item" onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="action"
            type="text"
            id="action"
            label=""
            placeholder="+ Add Item"
            component={CustomInput}
          />
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
