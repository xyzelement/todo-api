import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";

class AddSprint extends Component {
  async onStart(e) {
    e.preventDefault();
    await this.props.addSprintAction(this.props.auth.jwtToken);
  }

  async onStop(e) {
    e.preventDefault();
    var last = this.props.sprints[this.props.sprints.length - 1];
    await this.props.stopSprintAction(this.props.auth.jwtToken, last._id);
  }

  getLast() {
    return this.props.sprints
      ? this.props.sprints[this.props.sprints.length - 1]
      : undefined;
  }

  sprintState() {
    var last = this.getLast();
    return last && last.end ? <i>DONE</i> : <i>NOT DOTE</i>;
  }

  render() {
    var last = this.getLast();
    console.log("AAAAA", last);
    if (last) {
      last = this.props.sprints.length + ":" + moment(last.start).fromNow();
    }

    return (
      <span>
        {this.sprintState()}[{last}]
        <a href="/" onClick={this.onStart.bind(this)}>
          Start
        </a>
        &nbsp;
        <a href="/" onClick={this.onStop.bind(this)}>
          Stop
        </a>
        &nbsp;
      </span>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, sprints: state.auth.sprints };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  )
)(AddSprint);
