import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Task from "./Task";
import AddTask from "./AddTask";

class Tasks extends React.Component {
  componentWillMount() {
    console.log("Tasks:componentWillMount", this.props.auth.jwtToken.length);
    this.props.getTasksAction(this.props.auth.jwtToken);
  }

  renderTasks() {
    if (!this.props.tasks) return null;
    return this.props.tasks.map(task => <Task key={task._id} task={task} />);
  }

  render() {
    return (
      <div className="container">
        {this.renderTasks()}
        <AddTask />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tasks: state.auth.tasks
  };
};

export default connect(
  mapStateToProps,
  actions
)(Tasks);
