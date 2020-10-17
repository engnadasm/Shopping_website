import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { FaShoppingCart,FaPlay } from "react-icons/fa";
import ElementCart from "./ElementCart";
import history from './../history';
import axios from "axios";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../actions/itemActions';
import { loadUser} from '../actions/authActions';

class Cart extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }
  constructor() {
        super()
        this.state = {
            shopObjects : [
    									{id:1,
    									image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
    									title:'Title1',
    									rating:3,
    									price:'5 $',
    									stare : true, class : "Men" , category : 'Shoes'
    									},
    									{id:2,
    									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
    									title:'Title2',
    									rating:4,
    									price:'6 $',
    									stare : true, class : "Men" , category : 'Shoes'

    									},
    									{id:3,
    									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
    									 title:'Title3',
    									 rating:2,
    									price:'7 $',
    									stare : true, class : "Ladies" , category : 'Shoes'

    									},
    									{id:4,
    									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
    									 title:'Titl4',
    									 rating:2,
    									price:'8 $',
    									stare : true, class : "Ladies" , category : 'Shoes'

    								}]
        };
    }
    removeItem=(shopObject)=>{
      console.log(shopObject);
      console.log("Remove...");
      console.log("id" + shopObject._id);
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
         .put('/api/auth/uncart',body, config)
         .then(response =>{
           console.log(response);
         }
         )
         .catch(error => console.log(error));
         history.push('/Cart')

    }

    continuShopping=()=>{
      history.push('/SearchOut')
    }
  render() {
    const it = this.props.item.items;
    let g = [];

    if(this.props.user != null){
    console.log(this.props.user);

    const cart = this.props.user.cart;
    console.log(cart);
    console.log(it);
    if(it.length !== 0){

    let  found;
    for(let i=0;i<cart.length;i++){
      found = it.find(element => element._id === cart[i]);
      g[i] = found;
    }
  }
    console.log(g);
}
    return (
      <div className="container">

      <React.Fragment>
      <div className="row justify-content-center">
              <table className="table table-hover">
                  <thead>
                      <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Total</th>
                          <th> </th>
                      </tr>
                  </thead>
                  <tbody>
                  {g.map(shopObject =>
              		  <ElementCart key={shopObject._id} shopObject={shopObject} onRemove={this.removeItem}/>
              		 )}

                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h5>Subtotal</h5></td>
                          <td className="text-right"><h5><strong>$24.59</strong></h5></td>
                      </tr>
                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h5>Estimated shipping</h5></td>
                          <td className="text-right"><h5><strong>$6.94</strong></h5></td>
                      </tr>
                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h3>Total</h3></td>
                          <td className="text-right"><h3><strong>$31.53</strong></h3></td>
                      </tr>
                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td>
                          <div className="row p-1">
                          <button type="button" className="btn btn-danger " style={{width:'195px'}} onClick={this.continuShopping}>
                              <FaShoppingCart className="pb-1" size="20"/> Continue Shopping
                          </button>
                          </div></td>
                          <td>
                          <div className="row p-1">
                          <button type="button" className="btn btn-success" style={{width:'120px'}}>
                              Checkout <FaPlay className="pb-1" size="20"/>
                          </button>
                          </div></td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </React.Fragment>
      </div>

    )
  }
}

Cart.propTypes = {
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
)(Cart);
