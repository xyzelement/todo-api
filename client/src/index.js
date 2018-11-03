import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Tasks from "./components/Tasks";
import reducers from "./reducers";

//TODO: is this the right place?
import "./App.css";

const initialState = {
  auth: {
    jwtToken: localStorage.getItem("JWT_TOKEN"),
    isAuthenticated: localStorage.getItem("JWT_TOKEN") ? true : false
  }
};

console.log("INITIAL STATE: ", initialState);

ReactDOM.render(
  <Provider
    store={createStore(reducers, initialState, applyMiddleware(reduxThunk))}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/signout" component={SignOut} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);

serviceWorker.unregister();
