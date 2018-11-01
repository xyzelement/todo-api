import React from "react";

export default class Task extends React.Component {
  makeStar(task) {
    if (task.star) {
      return <span className="star star-on">•</span>;
    } else {
      return <span className="star">•</span>;
    }
  }

  makeCheck(task) {
    if (task.done) {
      return <span className="star star-on">✓</span>;
    } else {
      return <span className="star">✓</span>;
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
