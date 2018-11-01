import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Task from "./Task";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    //  this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    //TODO: I suspect this is the worst place to be calling this form
    this.props.getTasksAction();
  }

  renderTasks() {
    if (!this.props.tasks) return null;
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
  actions
)(Tasks);
