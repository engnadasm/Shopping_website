import React, { Component } from 'react';
import './ViewPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { FaTags, FaTimes,FaShoppingCart } from "react-icons/fa";
import { AiTwotoneHeart,AiTwotoneEdit } from "react-icons/ai";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import StarRatings from 'react-star-ratings';
import ReviewElem from './ReviewElem';
import Carousel from 'react-bootstrap/Carousel';
import CardDeck from 'react-bootstrap/CardDeck';
import history from './../history';

import { loadUser} from '../actions/authActions';
import axios from "axios";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../actions/itemActions';

class ViewPage extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getItems();
  }
  constructor(props) {
        super()
        this.state = {
          count : 0,
        }
}
    handleNext=()=>{
           if(this.state.count >= (Math.ceil(history.location.state.shop.reviews.length / 3 )- 1)){
              this.setState({count : 0})
            }
            else if(  this.state.count >= 0){
           this.setState({count:  this.state.count + 1})
            }
    }

    renderButtons=()=>{
        var buttonStyle;
        var buttonStyle2;

        buttonStyle= {border:"none", color:"red", outline:"none"}
        buttonStyle2= {border:"none", color:"black", outline:"none"}

        if (!history.location.state.shop.stare ){return (<OverlayTrigger
                                                      placement="top"
                                                      overlay={
                                                        <Tooltip>
                                                          Add to <strong>my favourites</strong>.
                                                        </Tooltip>
                                                      }
                                                    >
                                                    <a className="btn float-left" href=""
                                                    onClick={()=>this.addItem(history.location.state.shop)}>
                                                    <AiTwotoneHeart  style={buttonStyle2}
                                                     size={30}/></a>
                                             </OverlayTrigger>)}
       else { return (<OverlayTrigger
                                                      placement="top"
                                                      overlay={
                                                        <Tooltip>
                                                          Remove from <strong>my favourites</strong>.
                                                        </Tooltip>
                                                      }
                                                    >
                                                    <a className="btn float-left"href=""
                                                    onClick={()=>this.removeItem(history.location.state.shop)}>
                                                    <AiTwotoneHeart  style={buttonStyle}
                                                     size={30}/></a>
                                                    </OverlayTrigger>)}
      }

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
    console.log(history);
    return (
      <div className="container">
  <div className="card">
    <div className="container-fliud">
      <div className="wrapper row">
        <div className="preview col-md-6">

          <div className="preview-pic tab-content">
            <div className="tab-pane active" id="pic-1"><img alt="imagePic" src={history.location.state.shop.mainPic} /></div>
            <div className="tab-pane" id="pic-2"><img alt="imagePic" src={history.location.state.shop.mainPic} /></div>
            <div className="tab-pane" id="pic-3"><img alt="imagePic" src="http://placekitten.com/400/252" /></div>
            <div className="tab-pane" id="pic-4"><img alt="imagePic" src={history.location.state.shop.mainPic} /></div>
            <div className="tab-pane" id="pic-5"><img alt="imagePic" src="http://placekitten.com/400/252" /></div>
          </div>
          <ul className="preview-thumbnail nav nav-tabs">
            <li className="active"><a href="#pic1" data-target="#pic-1" data-toggle="tab"><img alt="imagePic" src={history.location.state.shop.mainPic} /></a></li>
            <li><a href="#pic2" data-target="#pic-2" data-toggle="tab"><img alt="imagePic" src={history.location.state.shop.mainPic} /></a></li>
            <li><a href="#pic3"data-target="#pic-3" data-toggle="tab"><img alt="imagePic" src="http://placekitten.com/200/126" /></a></li>
            <li><a href="#pic4" data-target="#pic-4" data-toggle="tab"><img alt="imagePic" src={history.location.state.shop.mainPic} /></a></li>
            <li><a href="#pic5" data-target="#pic-5" data-toggle="tab"><img alt="imagePic" src="http://placekitten.com/200/126" /></a></li>
          </ul>

        </div>
        <div className="details col-md-6">
          <h3 className="product-title">{history.location.state.shop.name}</h3>
          <div className="rating">
          <div className="float-left">
             <StarRatings
              rating={history.location.state.shop.rating}
              starRatedColor="yellow"
              starDimension="25px"
              numberOfStars={5}
              starSpacing="2px"
              name='rating'/>
              </div>

            <span className="review-no">(41 reviews)</span>
          </div>

          <p><FaTags/> Tags: <a href="#tagOfClass">
          <span className="badge badge-info">{history.location.state.shop.class}</span></a>&emsp;
           <a href="#tagOfCategory">
          <span className="badge badge-info">{history.location.state.shop.category}</span></a>
          </p>

          <h4 className="price">current price: <span>{history.location.state.shop.price}</span></h4>
          <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
          <h5 className="sizes">sizes:
            <span className="size" data-toggle="tooltip" title="small">s</span>
            <span className="size" data-toggle="tooltip" title="medium">m</span>
            <span className="size" data-toggle="tooltip" title="large">l</span>
            <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
          </h5>
          <h5 className="colors">colors:
            <span className="color orange" data-toggle="tooltip" title="Not In store"><FaTimes className="m-2" size={25} style={{color:"white"}}/></span>
            <span className="color green"></span>
            <span className="color blue"></span>
          </h5>

        { history.location.state.auth.isAuthenticated ? !history.location.state.shop.cart ?   <div className="action">
              <button className="add-to-cart btn btn-default"
               onClick={()=>this.addToCart(history.location.state.shop)}  >
               <FaShoppingCart className="pb-1" size="25"/>add to cart</button>
            </div> : null : null }
          { history.location.state.auth.isAuthenticated ? this.renderButtons() : null }

        </div>
      </div>
    </div>
    { history.location.state.auth.isAuthenticated ? <section className="p-3">
  <div className="container">
    <div className="row ">
      <div className="col-md-3 border text-center">
          <div className="card-body">
              <h1 className="text-danger">4.5</h1>
              <div className="sub-row text-warning">
              <div className="justify-content-center">

                 <StarRatings
                  rating={history.location.state.shop.rating}
                  starRatedColor="yellow"
                  starDimension="23px"
                  numberOfStars={5}
                  starSpacing="1px"
                  name='rating'/>
                  </div>
                                </div>
          </div>
      </div>
      <div className="col-md-5 border">
          <div className="card-body">
              <div className="row">
                  <div className="col-md-3">
                      <h6>5 Stars</h6>
                  </div>
                  <div className="col-md-7 pt-1">
                      <div className="progress">
                            <div className="progress-bar bg-success" style={{width:'20%'}}></div>
                          </div>
                  </div>
                  <div className="col-md-2">
                      <h6>(1)</h6>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3">
                      <h6>4 Stars</h6>
                  </div>
                  <div className="col-md-7 pt-1">
                      <div className="progress">
                            <div className="progress-bar bg-success" style={{width:'20%'}}></div>
                          </div>
                  </div>
                  <div className="col-md-2">
                      <h6>(1)</h6>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3">
                      <h6>3 Stars</h6>
                  </div>
                  <div className="col-md-7 pt-1">
                      <div className="progress">
                            <div className="progress-bar bg-warning" style={{width:'20%'}}></div>
                          </div>
                  </div>
                  <div className="col-md-2">
                      <h6>(1)</h6>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3">
                      <h6>2 Stars</h6>
                  </div>
                  <div className="col-md-7 pt-1">
                      <div className="progress">
                            <div className="progress-bar bg-danger" style={{width:'20%'}}></div>
                          </div>
                  </div>
                  <div className="col-md-2">
                      <h6>(1)</h6>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-3">
                      <h6>1 Star</h6>
                  </div>
                  <div className="col-md-7 pt-1">
                      <div className="progress">
                            <div className="progress-bar bg-danger" style={{width:'20%'}}></div>
                          </div>
                  </div>
                  <div className="col-md-2">
                      <h6>(1)</h6>
                  </div>
              </div>
          </div>
      </div>
      <div className="col-md-4 border text-center">
          <div className="card-body">
          <AiTwotoneEdit className="fa fa-pencil-square fa-3x text-success" size={40}/>
              <a href=""><h4>Write Your Views</h4></a>
              <small>share your experience/views about this product</small>
          </div>
      </div>
    </div>

  </div>
  </section> : null }

  <h2>Some Reviews</h2>
  <Carousel className = "pb-3"onSelect={this.handleNext} onClick={this.handleNext} >
  {history.location.state.shop.reviews.slice(0,Math.ceil(history.location.state.shop.reviews.length / 3 )).map(shopObject =>
  <Carousel.Item key={shopObject._id}>
  <div className="row d-flex justify-content-center">
  <div className="col-md-10">
  <CardDeck >

  <ReviewElem key={shopObject.id} shopObject={shopObject} />

  {history.location.state.shop.reviews.slice(Math.ceil(history.location.state.shop.reviews.length / 3 ) + this.state.count * 2,
    (this.state.count + 1) * 2 + Math.ceil(history.location.state.shop.reviews.length / 3 )).map(shopObject1 =>
  <ReviewElem key={shopObject1._id} shopObject={shopObject1}/>
  )}

  </CardDeck>
  </div>
  </div>
  </Carousel.Item>
  )}

  </Carousel>


  </div>

      </div>
    );
  }
}

ViewPage.propTypes = {
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
)(ViewPage);
