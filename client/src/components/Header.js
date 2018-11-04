import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  headerHelper(props) {
    if (props.auth.isAuthenticated) {
      return (
        <span>
          <Link to="/tasks">Tasks</Link>
          &nbsp;
          <Link to="/signout">Sign Out</Link>
        </span>
      );
    } else {
      return (
        <span>
          <Link to="/signup">Sign Up</Link>
          &nbsp;
          <Link to="/signin">Sign In</Link>*
        </span>
      );
    }
  }

  render() {
    return (
      <nav>
        {this.headerHelper(this.props)}
        <br />
        <br />
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  null
)(Header);
