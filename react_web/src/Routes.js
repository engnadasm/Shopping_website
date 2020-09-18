import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from './components/Home'
import Login from "./components/Login";
import SignUp from "./components/SignUp";

import history from './history';

export default class Routes extends Component {
  constructor(props) {
        super()
        this.state = {
            showLogin: true
        };
    }
    onCloseModal = () => {
      this.setState({ showLogin: false });
      history.push('/')
  };

   onOpenModalLogin = () => {
      this.setState({ showLogin: true });
  };
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/LoginPopup" component={() => <Login showForm={this.state.showLogin} onClose={this.onCloseModal} />}/>
                    <Route path="/signUp" component={SignUp} />
                </Switch>
            </Router>
        )
    }
}
