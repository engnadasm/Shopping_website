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

export default class Routes extends Component {
  constructor(props) {
        super()
        this.state = {
            showLogin: true,
            shopObject :  {id:1,
              image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
              title:'Title1',
              rating:3,
              price:'5 $',
              stare : false, class : "Men" , category : 'Shoes'
              }
        };
    }
    onCloseModal = () => {
      this.setState({ showLogin: false });
      history.push('/')
  };

   onOpenModalLogin = () => {
      this.setState({ showLogin: true });
  };
  removeItem=(shopObject)=>{
      shopObject.stare = false
  }

  addItem=(shopObjects)=>{
    shopObjects.stare = true
  }
  addToCart=(shopObjects)=>{
    history.push('/Cart')

  }
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
                    <Route path="/SearchOut" component={() => <SearchOut shopObject={this.state.shopObject}
                    isStarred={this.state.shopObject.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>} />
                    <Route path="/ViewPage" component={() => <ViewPage shopObject={this.state.shopObject}
                    isStarred={this.state.shopObject.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>} />

                </Switch>
            </Router>
        )
    }
}
