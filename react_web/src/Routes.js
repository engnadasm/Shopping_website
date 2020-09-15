import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import ShoppingList from './components/ShoppingList'
import Home from "./components/ShoppingList";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={ShoppingList} />
                    <Route path="/ShoppingList" component={ShoppingList} />
                </Switch>
            </Router>
        )
    }
}
