import React from "react";
import moment from "moment";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  makeStar(task) {
    const character = task.star ? "★" : "☆";
    if (task.done) {
      return <span className="star">{character}</span>;
    }

    return (
      <span className={"star" + (task.star ? " star-on" : "")}>
        <a href="/" onClick={this.onClick.bind(this, "star")}>
          {character}
        </a>
      </span>
    );
  }

  makeCheck(task) {
    return (
      <span className={"star" + (task.done ? " star-on" : "")}>
        <a href="/" onClick={this.onClick.bind(this, "done")}>
          ✓
        </a>
      </span>
    );
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
    return (
      <form onSubmit={this.onEdit.bind(this, "sub")}>
        <span className={task.done ? "action done" : "action"}>
          <input
            type="text"
            ref={input => {
              this.nameInput = input;
            }}
            readOnly={!this.state.editMode}
            defaultValue={task.action}
            onChange={this.onChange.bind(this)}
            onClick={this.onClick.bind(this, "edit")}
            onBlur={this.onEdit.bind(this, "sub")}
          />
        </span>
      </form>
    );
  }

  onChange(e) {
    this.setState({ newAction: e.target.value });
  }

  onEdit(action, e) {
    e.preventDefault();

    if (this.state.newAction && this.state.newAction.length > 0) {
      this.props.updateTaskAction(
        this.props.auth.jwtToken,
        this.props.task._id,
        {
          action: this.state.newAction
        }
      );
    }
    this.setState({ editMode: false });
  }

  static toggleContext(arr, context) {
    let i = arr.indexOf(context);
    if (i === -1) {
      arr.push(context);
    } else if (arr.length > 1) {
      arr.splice(i, 1);
    }

    return arr;
  }

  onContextClick(context, e) {
    e.preventDefault();

    this.props.updateTaskAction(this.props.auth.jwtToken, this.props.task._id, {
      context: Task.toggleContext([...this.props.task.context], context)
    });
  }

  //TODO: this probably gets replaced at least somewhat with sprints.
  onStatusClick(status, e) {
    e.preventDefault();

    if (status === this.props.task.status) {
      return;
    }

    //Don't ask tasks w/o context to leave inbox
    if (status === "action" && this.props.task.context.length === 0) {
      return;
    }

    this.props.updateTaskAction(this.props.auth.jwtToken, this.props.task._id, {
      status
    });
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

    //TODO: by default it's action being edited?!
    let out = {};
    out[action] = !this.props.task[action];

    this.props.updateTaskAction(
      this.props.auth.jwtToken,
      this.props.task._id,
      out
    );
  }

  makeContextSelector() {
    return this.props.contexts.map(con => {
      const current = this.props.task.context.includes(con);

      return (
        <span className={current ? "context-selected" : "done"} key={con}>
          <a href="/" onClick={this.onContextClick.bind(this, con)}>
            {con}
          </a>
          &nbsp;
        </span>
      );
    });
  }

  makeStatusSelector() {
    return this.props.statuses.map(stat => {
      return (
        <span
          className={
            stat === this.props.task.status ? "context-selected" : "done"
          }
          key={stat}
        >
          <a href="/" onClick={this.onStatusClick.bind(this, stat)}>
            {stat}
          </a>
          &nbsp;
        </span>
      );
    });
  }

  makeEditMode() {
    return (
      <span>
        {this.makeStatusSelector()}
        {this.makeContextSelector()}
        {this.makeDelete()}
      </span>
    );
  }

  makeAge() {
    if (this.props.mode !== "edit") return "";
    return (
      <span className="task-age">
        {moment(this.props.task.hist[0].on).fromNow(true)}
      </span>
    );
  }

  makeSprint(task) {
    if (!this.props.mode) return "";

    if (task.sprint) return <i>[{moment(task.sprint).fromNow()}]</i>;
    else return "...";
  }

  render() {
    return (
      <div>
        {this.props.mode === "edit" ? this.makeEditMode() : ""}
        {this.makeCheck(this.props.task)}
        {this.makeStar(this.props.task)}
        {this.makeSprint(this.props.task)}
        {this.makeAction(this.props.task)}
        {this.makeAge()}
      </div>
    );
  }
}
