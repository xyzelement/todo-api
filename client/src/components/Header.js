import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

class Header extends Component {
  headerHelper(props) {
    if (props.auth.isAuthenticated) {
      return (
        <span>
          <Link to="/tasks">Tasks</Link>*<Link to="/signout">SignOut</Link>
        </span>
      );
    } else {
      return (
        <span>
          <Link to="/signup">SignUp</Link>*<Link to="/signin">SignIn</Link>*
        </span>
      );
    }
  }

  render() {
    return (
      <nav>
        MY TODO *<b>{this.headerHelper(this.props)}</b>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default compose(
  connect(
    mapStateToProps,
    null
  )(Header)
);
