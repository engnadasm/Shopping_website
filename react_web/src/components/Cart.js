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
          myCart : [],
        }
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
         window.location.reload(false);

    }

    continuShopping=()=>{
      history.push({
          pathname: '/SearchOut',
          state: { category : 'All', class: 'All'}}
        );
      }
    Checkout=()=>{
      const it = this.props.item.items;
      let g = [];
      let totalPrice = 0;
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
        totalPrice = totalPrice +  g[i].price;
      }
    }
      console.log(g);
    }
      g.map(shopObject =>{
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
         .catch(error => console.log(error));}
      );
      window.location.reload(false);
    }
  render() {
    const it = this.props.item.items;
    let g = [];
    let totalPrice = 0;
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
      totalPrice = totalPrice +  g[i].price;
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
              		  <ElementCart key={shopObject._id} shopObject={shopObject} onRemove={this.removeItem.bind(this)}/>
              		 )}

                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td><h5>Subtotal</h5></td>
                          <td className="text-right"><h5><strong>{"$"+totalPrice}</strong></h5></td>
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
                          <td className="text-right"><h3><strong>{"$"+(totalPrice + 6.94)}</strong></h3></td>
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
                          <button type="button" className="btn btn-success" data-toggle="modal"
                           data-target="#modalAbandonedCart" style={{width:'120px'}}>
                              Checkout <FaPlay className="pb-1" size="20"/>
                          </button>
                          </div>

                          <div class="modal fade right" id="modalAbandonedCart" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                            aria-hidden="true" data-backdrop="false">
                            <div class="modal-dialog modal-side modal-bottom-right modal-notify modal-info" role="document">
                              <div class="modal-content">
                                <div class="modal-header" style={{background:"#0072ff"}}>
                                  <p class="heading">Confirm to buy all in the cart
                                  </p>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="white-text">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <div class="row">
                                    <div class="col-3">
                                      <p></p>
                                      <p class="text-center"><FaShoppingCart className="pb-1" size="80" style={{color:"#0072ff"}}/></p>
                                    </div>
                                    <div class="col-9">
                                      <p>Do you want make a purchase decision now?</p>
                                      <p>if no,Click on Cancel</p>
                                      <p>No pressure, your product will be waiting for you in the cart.</p>
                                      <p>if yes,Click on Confirm</p>

                                      <tr>
                                          <td><h5>Subtotal</h5></td>
                                          <td className="text-right"><h5><strong>{"$"+totalPrice}</strong></h5></td>
                                      </tr>
                                      <tr>
                                          <td><h5>Estimated shipping</h5></td>
                                          <td className="text-right"><h5><strong>$6.94</strong></h5></td>
                                      </tr>
                                      <tr>
                                          <td><h3>Total</h3></td>
                                          <td className="text-right"><h3><strong>{"$"+(totalPrice + 6.94)}</strong></h3></td>
                                      </tr>
                                    </div>
                                  </div>
                                </div>
                                <div class="modal-footer justify-content-center">
                                  <a type="button" class="btn btn-info" style={{background:"#0072ff"}} onClick={this.Checkout}>Confirm</a>
                                  <a type="button" class="btn btn-info waves-effect" style={{background:"#0072ff"}} data-dismiss="modal" >Cancel</a>
                                </div>
                              </div>
                            </div>
                          </div>

                          </td>
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
