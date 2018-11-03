import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Task extends React.Component {
  makeStar(task) {
    if (task.star) {
      return <span className="star star-on">•</span>;
    } else {
      return <span className="star">•</span>;
    }
  }

  makeCheck(task) {
    if (task.done) {
      return (
        <span className="star star-on">
          <a onClick={this.onClick.bind(this)}>✓</a>
        </span>
      );
    } else {
      return (
        <span className="star">
          <a onClick={this.onClick.bind(this)}>✓</a>
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

  onClick() {
    console.log("Task: onClick: ", this.props.task._id, this.props.task.done);
    this.props.updateTaskAction(this.props.task._id, {
      done: !this.props.task.done
    });
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

export default connect(
  null, //mapStateToProps,
  actions
)(Task);
