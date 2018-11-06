import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TaskWrapper from "./TaskWrapper";
import AddTask from "./AddTask";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false };
  }
  componentWillMount() {
    this.props.getTasksAction(this.props.auth.jwtToken);
    this.setState({ currentContext: this.props.contexts[0] });
  }

  onClick(context, e) {
    e.preventDefault();
    this.setState({ currentContext: context });
  }

  toggleEditMode(e) {
    e.preventDefault();
    this.setState({ editMode: !this.state.editMode });
  }

  renderContexts() {
    if (this.state.editMode) return <span>&nbsp;</span>;
    return this.props.contexts.map(context => {
      if (context === this.state.currentContext) {
        return <span key={context}>{context} </span>;
      } else {
        return (
          <a href="/" key={context} onClick={this.onClick.bind(this, context)}>
            {context}{" "}
          </a>
        );
      }
    });
  }

  renderHeaders() {
    return (
      <span>
        <span className="context">
          {this.renderContexts()}
          <Link style={{ float: "right" }} to="/signout">
            Sign Out
          </Link>
        </span>
        <span className={this.state.editMode ? "context-selected" : "context"}>
          <a
            style={{ float: "right" }}
            href="/"
            onClick={this.toggleEditMode.bind(this)}
          >
            Edit&nbsp;
          </a>
        </span>
      </span>
    );
  }

  renderTasks() {
    if (!this.props.tasks) return null;
    return this.props.tasks
      .filter(task => {
        return (
          this.state.editMode ||
          task.context.includes(this.state.currentContext)
        );
      })
      .map(task => (
        <TaskWrapper
          key={task._id}
          task={task}
          mode={this.state.editMode ? "edit" : "work"}
        />
      ));
  }

  render() {
    return (
      <div>
        {this.renderHeaders()}
        <AddTask context={this.state.currentContext} />
        <br />
        {this.renderTasks()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tasks: state.auth.tasks,
    contexts: ["Work", "Home", "Phone"]
  };
};

export default connect(
  mapStateToProps,
  actions
)(Tasks);
