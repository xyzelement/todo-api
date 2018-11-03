import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Task extends React.Component {
  makeStar(task) {
    if (task.star) {
      return (
        <span className="star star-on">
          <a href="/" onClick={this.onClick.bind(this, "star")}>
            •
          </a>
        </span>
      );
    } else {
      return (
        <span className="star">
          <a href="/" onClick={this.onClick.bind(this, "star")}>
            •
          </a>
        </span>
      );
    }
  }

  makeCheck(task) {
    if (task.done) {
      return (
        <span className="star star-on">
          <a href="/" onClick={this.onClick.bind(this, "done")}>
            ✓
          </a>
        </span>
      );
    } else {
      return (
        <span className="star">
          <a href="/" onClick={this.onClick.bind(this, "done")}>
            ✓
          </a>
        </span>
      );
    }
  }

  makeAction(task) {
    if (task.done) {
      return (
        <span className="action">
          <del>{task.action}</del>
        </span>
      );
    } else {
      return <span className="action">{task.action}</span>;
    }
  }

  onClick(action, e) {
    e.preventDefault();

    var out = {};
    out[action] = !this.props.task[action];

    console.log(
      "Task: onClick: ",
      action,
      this.props.task._id,
      this.props.task["action"],
      out
    );

    this.props.updateTaskAction(
      this.props.auth.jwtToken,
      this.props.task._id,
      out
    );
  }

  render() {
    return (
      <div className="task">
        {this.makeStar(this.props.task)}
        {this.makeAction(this.props.task)}
        {this.makeCheck(this.props.task)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Task);
