import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import * as sprintsActions from "../actions/sprint_actions";
import TaskWrapper from "./TaskWrapper";
import AddTask from "./AddTask";
import Sprint from "./Sprint";
import { Link } from "react-router-dom";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: undefined };
  }
  componentWillMount() {
    this.props.getTasksAction(this.props.auth.jwtToken);
    this.props.getSprintsAction(this.props.auth.jwtToken);
    this.setState({ currentContext: this.props.contexts[0] });
  }

  onClick(context, e) {
    e.preventDefault();
    this.setState({ currentContext: context });
  }

  toggleEditMode(mode, e) {
    e.preventDefault();

    let newMode = undefined;
    if (this.state.editMode === undefined) {
      newMode = mode;
    } else if (this.state.editMode === mode) {
      newMode = undefined;
    } else {
      newMode = mode;
    }

    this.setState({ editMode: newMode });
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
      <div>
        <div>
          <span className="context">
            {this.renderContexts()}
            <Link style={{ float: "right" }} to="/signout">
              Sign Out
            </Link>
          </span>
          <span
            className={
              this.state.editMode === "edit" ? "context-selected" : "context"
            }
          >
            <a
              style={{ float: "right" }}
              href="/"
              onClick={this.toggleEditMode.bind(this, "edit")}
            >
              Edit&nbsp;
            </a>
          </span>
          <span
            className={
              this.state.editMode === "inbox" ? "context-selected" : "context"
            }
          >
            <a
              style={{ float: "right" }}
              href="/"
              onClick={this.toggleEditMode.bind(this, "inbox")}
            >
              Inbox&nbsp;
            </a>
          </span>
        </div>
        {this.state.editMode ? <Sprint /> : ""}
      </div>
    );
  }

  renderTasks() {
    if (!this.props.sprints.current && !this.state.editMode) {
      return <b>No current sprint in action...</b>;
    }

    if (!this.props.tasks) return null;
    return this.props.tasks
      .filter(task => {
        return (
          // Edit mode = shows all
          this.state.editMode === "edit" ||
          // Inbox mode = shows all status=inbox
          (this.state.editMode === "inbox" && task.status === "inbox") ||
          // Regular mode filters actionable items by context
          (!this.state.editMode &&
            task.status === "action" &&
            task.context.includes(this.state.currentContext))
        );
      })
      .filter(task => {
        console.log(
          typeof task.sprint,
          typeof this.props.sprints.current.start
        );
        return (
          this.state.editMode || task.sprint === this.props.sprints.current
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

  renderAddBox() {
    if (!this.state.editMode) return "";
    //return <AddTask context={this.state.currentContext} />;
    return <AddTask />;
  }

  render() {
    return (
      <div>
        {this.renderHeaders()}
        <br />
        {this.renderAddBox()}
        <br />
        {this.renderTasks()}
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tasks: state.auth.tasks,
    sprints: state.sprints,
    contexts: ["Work", "Home", "Phone"]
  };
};

export default connect(
  mapStateToProps,
  { ...actions, ...sprintsActions }
)(Tasks);
