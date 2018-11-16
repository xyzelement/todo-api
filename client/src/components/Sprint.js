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

    // Make all un-sprinted items
    // part of this sprint
    for (const taskId in this.props.tasks) {
      const task = this.props.tasks[taskId];
      if (!task.sprint) {
        this.props.updateTaskAction(this.props.auth.jwtToken, task._id, {
          sprint: this.props.sprints.current.start
        });
      }
    }
  }

  async onStop(e) {
    e.preventDefault();

    //Don't allow a stop sprint if there are un-done tasks in it
    //TODO: this should be done server-side eventually
    const undone = this.props.tasks.filter(task => {
      if (!task.sprint) return false
      if (task.done) return false
      return (task.sprint.getTime() === this.props.sprints.current.start.getTime())
    })
    
    if (undone.length>0){
      return
    }

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

    return (
      "Sprint " +
      this.props.sprints.sprints.length +
      "(" +
      moment(this.props.sprints.current.start).fromNow() +
      ")"
    );
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
