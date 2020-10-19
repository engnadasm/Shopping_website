import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Service.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { AiTwotoneHeart } from "react-icons/ai";
import 'bootstrap/dist/js/bootstrap.min.js'
import StarRatings from 'react-star-ratings';

class ReviewElem extends Component {
  constructor(props){
super();
}

render(){
  return (
    <div key={this.props.shopObject.id} className="col-md-4">
    <div className="block-text rel zmin">
  <div className="mark">My rating:
  <span className="rating-input">
  <div className="float-right">

     <StarRatings
      rating={this.props.shopObject.rating}
      starRatedColor="yellow"
      starDimension="23px"
      numberOfStars={5}
      starSpacing="1px"
      name='rating'/>
      </div>
      </span>
</div>
    <p>{this.props.shopObject.description}</p>
  <ins className="ab zmin sprite sprite-i-triangle block"></ins>
  </div>
<div className="person-text rel">
        <img src={this.props.shopObject.image} className="avatar" alt="Avatar"/>
<a title="" href="#name">{this.props.shopObject.title}</a>
</div>
    </div>
  )
}
}
export default ReviewElem
