import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Service.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from 'react-bootstrap/Card';
import { AiTwotoneHeart } from "react-icons/ai";
import 'bootstrap/dist/js/bootstrap.min.js'
import StarRatings from 'react-star-ratings';

class ElementFav extends Component {
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
                                                        <AiTwotoneHeart className="float-right" style={buttonStyle2} 
                                                        onClick={()=>this.props.onStare(this.props.shopObject)} size={25}/>
                                               </OverlayTrigger>)}
         else { return (<OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                          <Tooltip>
                                                            Remove from <strong>my favourites</strong>.
                                                          </Tooltip>
                                                        }
                                                      >
                                                      <AiTwotoneHeart className="float-right" style={buttonStyle}
                                                      onClick={()=>this.props.onRemove(this.props.shopObject)} size={25}/>

                                                      </OverlayTrigger>)}
        }


render(){
  return (
    <div key={this.props.shopObject.id} className="col-md-12 p-3">
      <div className="item-box-blog">
        <div className="item-box-blog-image">
          <div className="item-box-blog-date bg-blue-ui white">
           <span className="mon">{this.props.shopObject.category}</span> </div>
           <div className="item-box-blog-class bg-blue-ui white">
            <span className="mon">{this.props.shopObject.class}</span> </div>
          <figure> <img alt=""className="pt-1" style={{height:'200px'}}
          src={this.props.shopObject.mainPic}/> </figure>
        </div>
        <div className="item-box-blog-body">
        <Card.Title>{this.props.shopObject.name}
                  {this.renderButtons()}
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
           { !this.props.shopObject.cart ? <div className="mt2"> <button className="btn bg-blue-ui white read"
            onClick={()=>this.props.addCart(this.props.shopObject)} >Add To Cart</button>
           </div> : null }
        </div>
      </div>
    </div>
  )
}
}
export default ElementFav
