import React, { Component } from 'react';
import './ViewPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { FaTags, FaTimes,FaShoppingCart } from "react-icons/fa";
import { AiTwotoneHeart,AiTwotoneEdit,AiFillFileText } from "react-icons/ai";
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
          rating : 0,
          text : "none"
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

      submitReview=()=>{
        console.log(this.props.user);
        const name = this.props.user.userName;
        const id = this.props.user._id;
        const src = this.props.user.src;
        const postId = history.location.state.shop._id;
        const rating = this.state.rating;
        const text = this.state.text;
        // Headers
        const config = {
          headers: {
            "Content-Type":"application/json"
           }
        };

        // Request body
        const body = JSON.stringify({name,id,src,postId,rating,text});
console.log(body);
        axios
         .put('/api/items/reviews',body, config)
         .then(response =>{
           console.log(response);
           history.push({
               pathname: '/ViewPage',
               state: { shop :  response.data, auth:history.location.state.auth}}
             );
            document.getElementById('modalPoll-1').setAttribute('style', 'display: none');
         }
         )
         .catch(error => console.log(error));

      }

      changeRating=( newRating, name ) =>{
      this.setState({
        rating: newRating
      });
    }
    onChange = e => {
          this.setState({ [e.target.name]: e.target.value });
    };
  render() {
    console.log(history);
    const all = history.location.state.shop.reviews;
    let g = []
    if(history.location.state.auth.isAuthenticated){
      if(all.length !== 0){
        let j = 0;
        for(let i=0;i<all.length;i++){
          if(all[i].postedBy === this.props.user._id || all[i].postedBy._id === this.props.user._id) {
            g[j] = all[i];
            j++;
          }
        }
    }
    }
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
      <div className="col-md-6 border text-center">
          <div className="card-body">
              <h1 className="text-danger">YOUR REVIEWs</h1>

                                {g.map(myreview =>
                                  <div key={myreview._id}>
                                  <div className="block-text rel zmin">
                                <div className="mark">My rating:
                                <span className="rating-input">
                                <div className="float-right">
                                   <StarRatings
                                    rating={myreview.rating}
                                    starRatedColor="yellow"
                                    starDimension="23px"
                                    numberOfStars={5}
                                    starSpacing="1px"
                                    name='rating'/>
                                    </div>
                                    </span>
                              </div>
                                  <p>{myreview.text}</p>
                                </div>
                                  </div>
                                )}
          </div>
      </div>
      <div className="col-md-6 border justify-content-center">
          <div className="card-body">
          <div className="row justify-content-center pb-3">
        <button type="button" className="btn btn-primary text-center" data-toggle="modal"
          data-target="#modalPoll-1"><AiTwotoneEdit
          className="fa fa-pencil-square fa-3x text-success"
          size={40}/><h4> Write Your Views </h4></button>
              </div>
              <div className="row justify-content-center">
              <h6>share your experience/views about this product</h6>
              </div>
          </div>
      </div>
    </div>

  </div>
  <div className="modal fade right" id="modalPoll-1" tabindex="-1"
  role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true" data-backdrop="false">
    <div className="modal-dialog modal-full-height modal-right modal-notify modal-info" role="document">
      <div className="modal-content">
        <div className="modal-header" style={{background:"blue"}}>
          <p className="heading lead">Write Your Views
          </p>

          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" className="white-text">×</span>
          </button>
        </div>

        <div className="modal-body">
          <div className="text-center">
          <AiFillFileText size={80} style={{color:"blue"}}/>
            <p>
              <strong>Your opinion matters</strong>
            </p>
            <p>Give us your feedback.
            </p>
          </div>

          <hr/>

          <p className="text-center">
            <strong>Your rating</strong>
          </p>
<div className="pl-5 ml-5">
          <StarRatings className="justify-content-center"
           rating={this.state.rating}
           changeRating={this.changeRating}
           starRatedColor="yellow"
           starDimension="50px"
           numberOfStars={5}
           starSpacing="1px"
           name='rating'/>
</div>
          <p className="text-center">
            <strong>share your experience/views about this product</strong>
          </p>
          <div className="md-form">
            <textarea type="text" id="form79textarea" name="text"
            onChange={this.onChange}
            className="md-textarea form-control" rows="3"></textarea>
          </div>

        </div>

        <div className="modal-footer justify-content-center">
          <a type="button" className="btn btn-primary waves-effect waves-light"
           onClick={this.submitReview.bind(this)}>Submit
            <i className="fa fa-paper-plane ml-1"></i>
          </a>
          <a type="button" className="btn btn-outline-primary waves-effect" id="forClose" data-dismiss="modal">Cancel</a>
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
