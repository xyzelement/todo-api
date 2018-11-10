import React, { Component } from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import * as sprintsActions from "../actions/sprint_actions";

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

  sprintIsOn() {
    var last = this.getLast();
    return last && !last.end;
  }

  makeSprintToggle() {
    if (this.sprintIsOn())
      return (
        <a href="/" onClick={this.onStop.bind(this)}>
          Stop
        </a>
      );
    else
      return (
        <a href="/" onClick={this.onStart.bind(this)}>
          Start
        </a>
      );
  }

  makeActiveSprint() {
    if (!this.sprintIsOn()) {
      return "";
    }

    const last = this.getLast();
    const out =
      "Sprint " +
      this.props.sprints.length +
      "(" +
      moment(last.start).fromNow() +
      ")";
    return out;
  }

  render() {
    return (
      <div className="sprint">
        {this.makeActiveSprint()}
        {this.makeSprintToggle()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, sprints: state.auth.sprints };
}

export default compose(
  connect(
    mapStateToProps,
    { ...actions, ...sprintsActions }
  )
)(AddSprint);
