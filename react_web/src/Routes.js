import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from './components/Home'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import UserProfile from './components/UserProfile'
import Cart from './components/Cart'
import SearchOut from './components/SearchOut'
import ViewPage from './components/ViewPage'
import ShoppingList from './components/ShoppingList'

import history from './history';

class Routes extends Component {

  constructor(props) {
        super()
        this.state = {
            showLogin: true,
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
                    <Route path="/UserProfile" component={UserProfile} />
                    <Route path="/ShoppingList" component={ShoppingList} />
                    <Route path="/Cart" component={Cart} />
                    <Route path="/SearchOut" component={() => <SearchOut />} />
                    <Route path="/ViewPage" component={() => <ViewPage />} />

                </Switch>
            </Router>
        )
    }
}

export default Routes;
