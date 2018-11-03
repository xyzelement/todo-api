import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Redirect } from "react-router-dom";

class SignOut extends Component {
  componentWillMount() {
    this.props.signOutAction();
  }

  helper() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/signin" />;
    }
  }

  render() {
    return <b>{this.helper()}</b>;
  }
}

function mapStateToProps(state) {
  return { isAuthenticated: state.auth.isAuthenticated };
}

export default connect(
  mapStateToProps,
  actions
)(SignOut);
