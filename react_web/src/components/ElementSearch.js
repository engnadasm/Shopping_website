import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Service.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from 'react-bootstrap/Card';
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
                                                      <a className="btn p-1 " href="#"
                                                      onClick={()=>this.props.onStare(this.props.shopObject)}>
                                                      <AiTwotoneHeart  style={buttonStyle2} size={25}
                                                       /></a>

                                               </OverlayTrigger>)}
         else { return (<OverlayTrigger
                                                        placement="left"
                                                        overlay={
                                                          <Tooltip>
                                                            Remove from <strong>my favourites</strong>.
                                                          </Tooltip>
                                                        }
                                                      >

                                                      <a className="btn p-1" href="#"
                                                      onClick={()=>this.props.onRemove(this.props.shopObject)}>
                                                      <AiTwotoneHeart  style={buttonStyle}
                                                       size={25}/></a>
                                                      </OverlayTrigger>)}
        }


render(){
  return (
    <div className="col-md-4" key={this.props.shopObject.id}>
                       <div class="single-publication">
                           <figure>
                               <a href="#">
                                   <img src={this.props.shopObject.image} alt="Publication Image"/>
                               </a>

                               <ul>
                                   <li><a href="#">  {this.renderButtons()}</a></li>
                                   <li><a href="#" title="Quick View" onClick={()=>this.props.onClick(this.props.shopObject)}><FaSearch/></a></li>
                               </ul>
                           </figure>

                           <div class="publication-content">
                               <span class="category">{this.props.shopObject.category}</span>
                               <h3><a href="#">{this.props.shopObject.title}</a></h3>

                                  <StarRatings
                                   rating={this.props.shopObject.rating}
                                   starRatedColor="yellow"
                                   starDimension="25px"
                                   changeRating={false}
                                   numberOfStars={5}
                                   starSpacing="1px"
                                   name='rating'/>

                               <h4 class="price">{this.props.shopObject.price}<span>$299</span></h4>
                           </div>


                           <div class="add-to-cart">
                               <a href="#" class="default-btn" onClick={()=>this.props.addCart(this.props.shopObject)}>Add to Cart</a>
                           </div>
                       </div>

  	</div>
  )
}
}
export default ElementSearch
