import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Service.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { AiTwotoneHeart } from "react-icons/ai";
import 'bootstrap/dist/js/bootstrap.min.js'
import StarRatings from 'react-star-ratings';
import { FaSearch } from "react-icons/fa";

class ElementSearch extends Component {
  constructor(props){
super();
}

      renderButtons=()=>{
          var buttonStyle;
          var buttonStyle2;

          buttonStyle= {border:"none", color:"red", outline:"none"}
          buttonStyle2= {color:"white",border:"none", outline:"none"}

          if (!this.props.isStarred ){return (<OverlayTrigger
                                                        placement="left"
                                                        overlay={
                                                          <Tooltip>
                                                            Add to <strong>my favourites</strong>.
                                                          </Tooltip>
                                                        }
                                                      >

                                                      <AiTwotoneHeart  style={buttonStyle2}
                                                      className="btn p-1 " href="#add"
                                                      size={30} onClick={()=>this.props.onStare(this.props.shopObject)}
                                                       />

                                               </OverlayTrigger>)}
         else { return (<OverlayTrigger
                                                        placement="left"
                                                        overlay={
                                                          <Tooltip>
                                                            Remove from <strong>my favourites</strong>.
                                                          </Tooltip>
                                                        }
                                                      >

                                                      <AiTwotoneHeart className="btn p-1" href="#remove"
                                                      onClick={()=>this.props.onRemove(this.props.shopObject)}
                                                       style={buttonStyle}
                                                       size={30}/>
                                                      </OverlayTrigger>)}
        }


render(){
  return (
    <div className="col-md-4" key={this.props.shopObject._id}>
                       <div className="single-publication">
                           <figure>
                               <a href="#pic">
                                   <img src={this.props.shopObject.mainPic} alt="Publication"/>
                               </a>

                               <ul>
                               { this.props.auth.isAuthenticated ?  <li><a href="#showStare">  {this.renderButtons()}</a></li> : null }


                                   <li><a title="Quick View" onClick={()=>this.props.onClick(this.props.shopObject)}><FaSearch/></a></li>
                               </ul>
                           </figure>

                           <div className="publication-content">
                               <span className="category">{this.props.shopObject.category}</span>
                               <h3><a href="#name">{this.props.shopObject.name}</a></h3>

                                  <StarRatings
                                   rating={this.props.shopObject.rating}
                                   starRatedColor="yellow"
                                   starDimension="25px"
                                   numberOfStars={5}
                                   starSpacing="1px"
                                   name='rating'/>

                               <h4 className="price">{this.props.shopObject.price}<span>$299</span></h4>
                           </div>
                           { this.props.auth.isAuthenticated ?  !this.props.shopObject.cart ? <div className="add-to-cart">
                               <a href="#addCart" className="default-btn" onClick={()=>this.props.addCart(this.props.shopObject)}>Add to Cart</a>
                           </div> : null  : null }
                       </div>

  	</div>
  )
}
}
export default ElementSearch
