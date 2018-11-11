import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import * as sprintsActions from "../actions/sprint_actions";
import * as actions from "../actions";

class AddSprint extends Component {
  async onStart(e) {
    e.preventDefault();

    await this.props.addSprintAction(this.props.auth.jwtToken);

    for (var taskId in this.props.tasks) {
      var task = this.props.tasks[taskId];
      this.props.updateTaskAction(this.props.auth.jwtToken, task._id, {
        sprint: this.props.sprints.current.start
      });
    }
  }

  async onStop(e) {
    e.preventDefault();
    await this.props.stopSprintAction(
      this.props.auth.jwtToken,
      this.props.sprints.current._id
    );
  }

  makeSprintToggle() {
    if (this.props.sprints.current)
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
    if (!this.props.sprints.current) {
      return "";
    }

    const out =
      "Sprint " +
      this.props.sprints.sprints.length +
      "(" +
      moment(this.props.sprints.current).fromNow() +
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
  return { auth: state.auth, sprints: state.sprints, tasks: state.auth.tasks };
}

export default compose(
  connect(
    mapStateToProps,
    { ...sprintsActions, ...actions }
  )
)(AddSprint);
