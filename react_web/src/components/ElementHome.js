import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Service.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from 'react-bootstrap/Card';
import { AiTwotoneHeart } from "react-icons/ai";
import 'bootstrap/dist/js/bootstrap.min.js'
import StarRatings from 'react-star-ratings';

class ElementHome extends Component {
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
                                                      <a className="btn float-right" href="#add"
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
                                                      <a className="btn float-right" href="#remove"
                                                      onClick={()=>this.props.onRemove(this.props.shopObject)}>
                                                      <AiTwotoneHeart  style={buttonStyle}
                                                       size={25}/></a>
                                                      </OverlayTrigger>)}
        }


render(){
  return (
    <div key={this.props.shopObject._id} className="col-md-4">
      <div className="item-box-blog">
        <div className="item-box-blog-image">
          <div className="item-box-blog-date bg-blue-ui white">
           <span className="mon">{this.props.shopObject.category}</span> </div>
           <div className="item-box-blog-class bg-blue-ui white">
            <span className="mon">{this.props.shopObject.class}</span> </div>
          <figure> <img alt=""className="pt-1"
          src={this.props.shopObject.mainPic}/> </figure>
        </div>
        <div className="item-box-blog-body">
        <Card.Title>{this.props.shopObject.name}
        { this.props.auth.isAuthenticated ? this.renderButtons() : null }

                  </Card.Title>

          <div className="item-box-blog-text">
          <Card.Title>
            {this.props.shopObject.price}
            <div className="float-right">

               <StarRatings
                rating={this.props.shopObject.rating}
                starRatedColor="yellow"
                starDimension="25px"
                numberOfStars={5}
                starSpacing="2px"
                name='rating'/>
                </div>

                              </Card.Title>
          </div>
           <div className="mt1"> <button className="btn bg-blue-ui white read"
           onClick={()=>this.props.onClick(this.props.shopObject)}>View Details</button>
           </div>
           { this.props.auth.isAuthenticated ?  !this.props.shopObject.cart ? <div className="mt2"> <button className="btn bg-blue-ui white read"
            onClick={()=>this.props.addCart(this.props.shopObject)} >Add To Cart</button>
           </div> : null : null }



        </div>
      </div>
    </div>
  )
}
}
export default ElementHome
