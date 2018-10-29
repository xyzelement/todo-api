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
import Dashboard from "./components/Dashboard";

import reducers from "./reducers";

ReactDOM.render(
  // This is our router component, it's asking the App
  // component to set its content to the Home component.
  // The component part will be passed into App as props
  //
  // TODO: understand the connection between BrowserRouter
  // and Route - and how these Routes make sense inside
  // the App tag
  //
  // Alright, so the "store" is where redux keeps all our
  // data. And provider somehow magically makes this
  // state available to all container components in the
  // app.
  //
  // ReduxThunk is middleware for handling asynch stuff.
  // Basically normally actions need to be processed
  // synchronously. Thunk solves that: lets you call action
  // creators that return a function instead of an action
  // object. That function receives the store’s dispatch
  // method, which is then used to dispatch regular
  // synchronous actions inside the body of the function
  // once the asynchronous operations have completed.
  <Provider store={createStore(reducers, {}, applyMiddleware(reduxThunk))}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/dashboard" component={Dashboard} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);

serviceWorker.unregister();
