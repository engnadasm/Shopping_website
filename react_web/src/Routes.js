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

import { loadUser} from './actions/authActions';
import axios from "axios";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from './actions/itemActions';

class Routes extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }
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
    console.log("Remove...");
    console.log("id" + shopObject._id);
      shopObject.stare = false
      history.push({
          pathname: '/ViewPage',
          state: { shop : shopObject }}
        );
      // Headers
      const config = {
        headers: {
          "Content-Type":"application/json",
           "x-auth-token": this.props.token,
           "user": this.props.user,
         }
      };

      // Request body
    //	const {gender,userName } = this.state;
      const body = JSON.stringify({shopObject});

      axios
       .put('/api/auth/unfavorite',body, config)
       .then(response =>{
         console.log(response);
       }
       )
       .catch(error => console.log(error));
  }

  addItem=(shopObjects)=>{
    console.log("add...");
    console.log("id" + shopObjects._id);
    shopObjects.stare = true
    console.log(shopObjects);
    history.push({
        pathname: '/ViewPage',
        state: { shop : shopObjects }}
      );
      console.log("finish");
    // Headers
    const config = {
      headers: {
        "Content-Type":"application/json",
         "x-auth-token": this.props.token,
         "user": this.props.user,
       }
    };

    // Request body
  //	const {gender,userName } = this.state;
    const body = JSON.stringify({shopObjects});

    axios
     .put('/api/auth/favorite',body, config)
     .then(response =>{
       console.log(response);
     }
     )
     .catch(error => console.log(error));


  }

  addToCart=(shopObjects)=>{
    console.log("addToCart...");
    console.log("id" + shopObjects._id);
    // Headers
    const config = {
      headers: {
        "Content-Type":"application/json",
         "x-auth-token": this.props.token,
         "user": this.props.user,
       }
    };

    // Request body
  //	const {gender,userName } = this.state;
    const body = JSON.stringify({shopObjects});

    axios
     .put('/api/auth/cart',body, config)
     .then(response =>{
       console.log(response);
     }
     )
     .catch(error => console.log(error));

    history.push('/Cart')
  }

    render() {
      console.log(this.props);
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
                    <Route path="/ViewPage" component={() => <ViewPage  onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>} />

                </Switch>
            </Router>
        )
    }
}
Routes.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  token : state.auth.token,
  item: state.item
});

export default connect(
  mapStateToProps,
  {loadUser ,  getItems}
)(Routes);
