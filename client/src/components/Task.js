import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeStar(task) {
    if (task.star) {
      return (
        <span className="star star-on">
          <a href="/" onClick={this.onClick.bind(this, "star")}>
            ★
          </a>
        </span>
      );
    } else {
      return (
        <span className="star">
          <a href="/" onClick={this.onClick.bind(this, "star")}>
            ☆
          </a>
        </span>
      );
    }
  }

  makeCheck(task) {
    if (task.done) {
      return (
        <span className="star star-on">
          <a href="/" onClick={this.onClick.bind(this, "done")}>
            ✓
          </a>
        </span>
      );
    } else {
      return (
        <span className="star">
          <a href="/" onClick={this.onClick.bind(this, "done")}>
            ✓
          </a>
        </span>
      );
    }
  }

  makeDelete() {
    return (
      <span className="star">
        <a href="/" onClick={this.onClick.bind(this, "delete")}>
          ✗
        </a>
      </span>
    );
  }

  makeAction(task) {
    if (task.done) {
      return (
        <span className="action">
          <del>{task.action}</del>
        </span>
      );
    } else {
      return (
        <form onSubmit={this.onEdit.bind(this, "sub")}>
          <span className="action">
            <input
              type="text"
              ref={input => {
                this.nameInput = input;
              }}
              readOnly={!this.state.editMode}
              defaultValue={task.action}
              onChange={this.onChange.bind(this)}
              onClick={this.onClick.bind(this, "edit")}
            />
          </span>
        </form>
      );
    }
  }

  onChange(e) {
    this.setState({ newAction: e.target.value });
  }

  onEdit(action, e) {
    e.preventDefault();
    this.props.updateTaskAction(this.props.auth.jwtToken, this.props.task._id, {
      action: this.state.newAction
    });
    this.setState({ editMode: false });
  }

  onClick(action, e) {
    e.preventDefault();

    if (action === "delete") {
      this.props.deleteTaskAction(
        this.props.auth.jwtToken,
        this.props.task._id
      );
      return;
    }

    if (action === "edit") {
      this.setState({ editMode: true });
      this.nameInput.focus();
      return;
    }

    var out = {};
    out[action] = !this.props.task[action];

    this.props.updateTaskAction(
      this.props.auth.jwtToken,
      this.props.task._id,
      out
    );
  }

  render() {
    return (
      <div className="task">
        {this.makeDelete()}
        {this.makeCheck(this.props.task)}
        {this.makeStar(this.props.task)}
        {this.makeAction(this.props.task)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Task);
