import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Task from "./Task";
import AddTask from "./AddTask";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getTasksAction(this.props.auth.jwtToken);
    this.setState({ currentContext: this.props.contexts[0] });
  }

  onClick(context, e) {
    e.preventDefault();
    this.setState({ currentContext: context });
  }

  renderContexts() {
    return (
      <div>
        {this.props.contexts.map(context => {
          if (context === this.state.currentContext) {
            return (
              <span key={context}>
                <b>{context}</b>
              </span>
            );
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
      </div>
    );
  }

  renderTasks() {
    if (!this.props.tasks) return null;
    return this.props.tasks
      .filter(task => {
        return task.context.includes(this.state.currentContext);
      })
      .map(task => <Task key={task._id} task={task} />);
  }

  render() {
    return (
      <div className="container">
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
    contexts: ["Work", "Home"]
  };
};

export default connect(
  mapStateToProps,
  actions
)(Tasks);
