import React from "react";
import { connect } from "react-redux";

import Task from "./Task";

class Tasks extends React.Component {
  renderTasks() {
    if (!this.props.tasks) return <b>Done or dead/</b>;

    return this.props.tasks.map(task => <Task key={task._id} task={task} />);
  }

  render() {
    return <div className="container">{this.renderTasks()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    constant: "some things never change",
    tasks: state.auth.tasks
  };
};

export default connect(
  mapStateToProps,
  null //,mapDispatchToProps
)(Tasks);
