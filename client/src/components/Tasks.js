import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TaskWrapper from "./TaskWrapper";
import AddTask from "./AddTask";
import { Link } from "react-router-dom";
import moment from "moment";

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

    var newMode = undefined;
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
    var thisSprint = "";
    if (this.props.sprints) {
      thisSprint = this.props.sprints.find(sprint => {
        return sprint.end === undefined;
      });
      if (thisSprint) {
        thisSprint = moment(thisSprint.start).format("MMM Do YYYY");
      }
    }
    return (
      <span>
        <b>[{thisSprint}] </b>
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
      </span>
    );
  }

  renderTasks() {
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    tasks: state.auth.tasks,
    sprints: state.auth.sprints,
    contexts: ["Work", "Home", "Phone"]
  };
};

export default connect(
  mapStateToProps,
  actions
)(Tasks);
