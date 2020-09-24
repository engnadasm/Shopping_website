import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Service.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from 'react-bootstrap/Card';
import { AiTwotoneHeart } from "react-icons/ai";
import 'bootstrap/dist/js/bootstrap.min.js'
import StarRatings from 'react-star-ratings';

class ReviewElem extends Component {
  constructor(props){
super();
}

      renderButtons=()=>{
          var buttonStyle;
          var buttonStyle2;

          buttonStyle= {border:"none", color:"red", outline:"none"}
          buttonStyle2= {border:"none", color:"black", outline:"none"}

          if (!this.props.isStarred ){return (<OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                          <Tooltip>
                                                            Add to <strong>my favourites</strong>.
                                                          </Tooltip>
                                                        }
                                                      >
                                                      <a className="btn float-right"
                                                      onClick={()=>this.props.onStare(this.props.shopObject)}>
                                                      <AiTwotoneHeart  style={buttonStyle2}
                                                       size={25}/></a>
                                               </OverlayTrigger>)}
         else { return (<OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                          <Tooltip>
                                                            Remove from <strong>my favourites</strong>.
                                                          </Tooltip>
                                                        }
                                                      >
                                                      <a className="btn float-right"
                                                      onClick={()=>this.props.onRemove(this.props.shopObject)}>
                                                      <AiTwotoneHeart  style={buttonStyle}
                                                       size={25}/></a>
                                                      </OverlayTrigger>)}
        }


render(){
  return (
    <div key={this.props.shopObject.id} className="col-md-4">
    <div class="block-text rel zmin">
  <div class="mark">My rating:
  <span class="rating-input">
  <div className="float-right">

     <StarRatings
      rating={this.props.shopObject.rating}
      starRatedColor="yellow"
      starDimension="23px"
      changeRating={false}
      numberOfStars={5}
      starSpacing="1px"
      name='rating'/>
      </div>
      </span>
</div>
    <p>{this.props.shopObject.description}</p>
  <ins class="ab zmin sprite sprite-i-triangle block"></ins>
  </div>
<div class="person-text rel">
        <img src={this.props.shopObject.image} class="avatar" alt="Avatar"/>
<a title="" href="#">{this.props.shopObject.title}</a>
</div>
    </div>
  )
}
}
export default ReviewElem
