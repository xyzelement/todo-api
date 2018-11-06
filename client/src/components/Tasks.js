import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import TaskWrapper from "./TaskWrapper";
import AddTask from "./AddTask";

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
    return (
      <div className="context">
        {this.props.contexts.map(context => {
          if (context === this.state.currentContext) {
            return <span key={context}>{context} </span>;
          } else {
            return (
              <a
                href="/"
                key={context}
                onClick={this.onClick.bind(this, context)}
              >
                {context}{" "}
              </a>
            );
          }
        })}
        <a style={{ float: "right" }} href="/signout">
          Sign Out
        </a>

        <a
          style={{ float: "right" }}
          href="/"
          onClick={this.toggleEditMode.bind(this)}
        >
          Edit&nbsp;
        </a>
      </div>
    );
  }

  renderTasks() {
    if (!this.props.tasks) return null;
    return this.props.tasks
      .filter(task => {
        return (
          this.state.currentContext === "All" ||
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
        {this.renderContexts()}
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
    contexts: ["Work", "Home", "Phone", "All"]
  };
};

export default connect(
  mapStateToProps,
  actions
)(Tasks);
