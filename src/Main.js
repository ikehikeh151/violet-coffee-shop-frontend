import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Components
import SignUp from "./pages/signUp/signup";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import React, { Component } from "react";

export default class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/Login" component={Login} />
          <Route path="/Forgot_password" component={ForgotPassword} />
        </Switch>
      </BrowserRouter>
    );
  }
}
