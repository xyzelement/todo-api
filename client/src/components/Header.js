import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav>
        MY TODO *<Link to="/dashboard">Dashboard</Link>*
        <Link to="/signup">SignUp</Link>*<Link to="/signin">SignIn</Link>*
        <Link to="/signout">SignOut</Link>
      </nav>
    );
  }
}
