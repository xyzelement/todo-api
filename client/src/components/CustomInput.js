import React, { Component } from "react";

export default class CustomInput extends Component {
  makeLabel() {
    if (!this.props.label) return "";
    return (
      <label className="custom-input-label" htmlFor={this.props.id}>
        {this.props.label}
      </label>
    );
  }

  render() {
    const {
      input: { value, onChange }
    } = this.props;

    return (
      <span>
        {this.makeLabel()}

        <input
          className="custom-input-label"
          name={this.props.name}
          id={this.props.id}
          placeholder={this.props.placeholder}
          type={this.props.type}
          value={value}
          onChange={onChange}
        />
      </span>
    );
  }
}
