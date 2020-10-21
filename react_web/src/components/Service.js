import React, { Component} from 'react'
import ElementHome from './ElementHome';
import Carousel from 'react-bootstrap/Carousel';
import CardDeck from 'react-bootstrap/CardDeck';
import './Service.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import history from './../history';

import { loadUser} from '../actions/authActions';
import axios from "axios";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../actions/itemActions';

class Service extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }
       constructor() {
            super()

              this.state = {
                count : 0,

              }
              this.handleNext = this.handleNext.bind(this);
              this.addItem = this.addItem.bind(this);

        }

        viewShopPage=(shopObject)=>{
          console.log("viewShopPage...");
          console.log("id" + shopObject._id);

        history.push({
            pathname: '/ViewPage',
            state: { shop : shopObject, auth: this.props.auth }}
          );
        }

        removeItem=(shopObject)=>{
          console.log("Remove...");
          console.log("id" + shopObject._id);
            shopObject.stare = false
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
  handleNext=()=>{
         if(this.state.count >= (this.props.item.items.length / 3 - 1)){
            this.setState({count : 0})
          }
          else if(  this.state.count >= 0){
         this.setState({count:  this.state.count + 1})
          }
  }

  render(){
    const it = this.props.item.items;
if(this.props.user != null){
console.log(this.props.user);

const cart = this.props.user.favorite;
const favorite = this.props.user.cart;

console.log(cart);
console.log(it);
if(it.length !== 0){

let  found;
for(let i=0;i<cart.length;i++){
  found = it.findIndex(element => element._id === cart[i]);
  it[found].stare = true;
}
for(let i=0;i<favorite.length;i++){
  found = it.findIndex(element => element._id === favorite[i]);
  it[found].cart = true;
}
}
}

  return (
    <Carousel className = "p-3"onSelect={this.handleNext} onClick={this.handleNext}id="shoppingList" >
{it.slice(0,Math.ceil(it.length / 3)).map(shopObject =>
  <Carousel.Item key={shopObject._id}>
  <div className="row d-flex justify-content-center">
  <div className="col-md-10">
  <CardDeck >

  <ElementHome key={shopObject.id} shopObject={shopObject} onClick={this.viewShopPage} auth={this.props.auth}
          isStarred={shopObject.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>

  {it.slice(Math.ceil(it.length / 3) + this.state.count * 2,(this.state.count + 1) * 2 + Math.ceil(it.length / 3)).map(shopObject1 =>
    <ElementHome key={shopObject1._id} shopObject={shopObject1} onClick={this.viewShopPage} auth={this.props.auth}
          isStarred={shopObject1.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>
  )}

  </CardDeck>
  </div>
  </div>
  </Carousel.Item>
 )}

 </Carousel>
  )}
}

Service.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  token : state.auth.token,
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {loadUser ,  getItems}
)(Service);
