import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Service.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import StarRatings from 'react-star-ratings';
import {FaTimes, FaTags } from "react-icons/fa";

class ElementCart extends Component {
  constructor(props){
super();
}

render(){
  return (
    <React.Fragment>

    <tr>
        <td className="col-md-6">
        <div className="media">
            <a href="#pics" className="thumbnail pull-left">
            <img href="#itemPic" className="media-object" src={this.props.shopObject.image}
            alt="imagePic" style={{width: '72px', height: '72px'}}/>
            </a>
            <div className="media-body pl-2">
             <h4> {this.props.shopObject.title} </h4>

                  <p><FaTags/> Tags: <a href="#class">
                  <span className="badge badge-info">{this.props.shopObject.class}</span></a>
                   <a href="#category" >
                  <span className="badge badge-info">{this.props.shopObject.category}</span></a>
                  </p>


                  <div className="float-left">

                     <StarRatings
                      rating={this.props.shopObject.rating}
                      starRatedColor="yellow"
                      starDimension="25px"
                      numberOfStars={5}
                      starSpacing="2px"
                      name='rating'/>
                      </div>
                </div>
        </div>
        </td>
        <td className="col-md-1" >
        <input type="email" className="form-control" id={"exampleInputEmail1"+this.props.shopObject.id} defaultValue="2"/>
        </td>
        <td className="col-md-1 text-center"><strong>{this.props.shopObject.price}</strong></td>
        <td className="col-md-1 text-center"><strong>{this.props.shopObject.price}</strong></td>
        <td className="col-md-1">
        <div className="row">
        <button type="button" className="btn btn-danger" onClick={()=>this.props.onRemove(this.props.shopObject)}>
              <FaTimes className="pb-1" size="20"/> Remove
        </button>
        </div></td>
    </tr>
    </React.Fragment>

  )
}
}
export default ElementCart
