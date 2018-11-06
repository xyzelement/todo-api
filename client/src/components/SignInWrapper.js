/* This cannot possibly be the right way to do this. */
import * as actions from "../actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm } from "redux-form";
import SignIn from "./SignIn";

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
