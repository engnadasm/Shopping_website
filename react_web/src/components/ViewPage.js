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

class ViewPage extends Component {
  constructor(props) {
        super()
        this.state = {
          count : 0,
          shopObjects : [
                    {id:1,
                    image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                    title:'Title1',
                    rating:3,
                    price:'5 $',
                    stare : false, class : "Men" , category : 'Shoes'
                    },
                    {id:2,
                     image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                    title:'Title2',
                    rating:4,
                    price:'6 $',
                    stare : false, class : "Men" , category : 'Shoes'

                    },
                    {id:3,
                     image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                     title:'Title3',
                     rating:2,
                    price:'7 $',
                    stare : false, class : "Ladies" , category : 'Shoes'

                    },
                    {id:4,
                     image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                     title:'Titl4',
                     rating:2,
                    price:'8 $',
                    stare : false, class : "Ladies" , category : 'Shoes'

                  },
                    {id:5,
                     image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                    title:'9 $',
                    rating:4,
                    price:'price5',
                    stare : false, class : "Ladies" , category : 'Shoes'

                    },
                    {id:6,
                     image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                     title:'Title6',
                     rating:2,
                    price:'10 $',
                    stare : false, class : "Ladies" , category : 'Tops'

                  },
                  {id:7,
                   image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                   title:'Title7',
                   rating:2,
                  price:'11 $',
                  stare : false, class : "Ladies" , category : 'Tops'

                },{id:8,
                 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',description:'description for review of user about product ^_^',
                 title:'Title8',
                 rating:3,
                price:'12 $',
                stare : false, class : "Ladies" , category : 'Tops'

                }]
        }
}
    handleNext=()=>{
           if(this.state.count >= (this.state.shopObjects.length / 3 - 1)){
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

        if (!this.props.isStarred ){return (<OverlayTrigger
                                                      placement="top"
                                                      overlay={
                                                        <Tooltip>
                                                          Add to <strong>my favourites</strong>.
                                                        </Tooltip>
                                                      }
                                                    >
                                                    <a className="btn float-left" href="#add"
                                                    onClick={()=>this.props.onStare(this.props.shopObject)}>
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
                                                    <a className="btn float-left"href="#remove"
                                                    onClick={()=>this.props.onRemove(this.props.shopObject)}>
                                                    <AiTwotoneHeart  style={buttonStyle}
                                                     size={30}/></a>
                                                    </OverlayTrigger>)}
      }
  render() {
    return (
      <div className="container">
  <div className="card">
    <div className="container-fliud">
      <div className="wrapper row">
        <div className="preview col-md-6">

          <div className="preview-pic tab-content">
            <div className="tab-pane active" id="pic-1"><img alt="imagePic" src={this.props.shopObject.image} /></div>
            <div className="tab-pane" id="pic-2"><img alt="imagePic" src={this.props.shopObject.image} /></div>
            <div className="tab-pane" id="pic-3"><img alt="imagePic" src="http://placekitten.com/400/252" /></div>
            <div className="tab-pane" id="pic-4"><img alt="imagePic" src={this.props.shopObject.image} /></div>
            <div className="tab-pane" id="pic-5"><img alt="imagePic" src="http://placekitten.com/400/252" /></div>
          </div>
          <ul className="preview-thumbnail nav nav-tabs">
            <li className="active"><a href="#pic1" data-target="#pic-1" data-toggle="tab"><img alt="imagePic" src={this.props.shopObject.image} /></a></li>
            <li><a href="#pic2" data-target="#pic-2" data-toggle="tab"><img alt="imagePic" src={this.props.shopObject.image} /></a></li>
            <li><a href="#pic3"data-target="#pic-3" data-toggle="tab"><img alt="imagePic" src="http://placekitten.com/200/126" /></a></li>
            <li><a href="#pic4" data-target="#pic-4" data-toggle="tab"><img alt="imagePic" src={this.props.shopObject.image} /></a></li>
            <li><a href="#pic5" data-target="#pic-5" data-toggle="tab"><img alt="imagePic" src="http://placekitten.com/200/126" /></a></li>
          </ul>

        </div>
        <div className="details col-md-6">
          <h3 className="product-title">{this.props.shopObject.title}</h3>
          <div className="rating">
          <div className="float-left">
             <StarRatings
              rating={this.props.shopObject.rating}
              starRatedColor="yellow"
              starDimension="25px"
              numberOfStars={5}
              starSpacing="2px"
              name='rating'/>
              </div>

            <span className="review-no">(41 reviews)</span>
          </div>

          <p><FaTags/> Tags: <a href="#tagOfClass">
          <span className="badge badge-info">{this.props.shopObject.class}</span></a>&emsp;
           <a href="#tagOfCategory">
          <span className="badge badge-info">{this.props.shopObject.category}</span></a>
          </p>

          <h4 className="price">current price: <span>{this.props.shopObject.price}</span></h4>
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
          <div className="action">
            <button className="add-to-cart btn btn-default"
             onClick={()=>this.props.addCart(this.props.shopObject)}  >
             <FaShoppingCart className="pb-1" size="25"/>add to cart</button>
          </div>
          {this.renderButtons()}

        </div>
      </div>
    </div>
    <section className="p-3">
  <div className="container">
    <div className="row ">
      <div className="col-md-3 border text-center">
          <div className="card-body">
              <h1 className="text-danger">4.5</h1>
              <div className="sub-row text-warning">
              <div className="justify-content-center">

                 <StarRatings
                  rating={this.props.shopObject.rating}
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
              <a href="#REVIEW"><h4>Write Your Views</h4></a>
              <small>share your experience/views about this product</small>
          </div>
      </div>
    </div>

  </div>
  </section>

  <div className="container">
  <div className="row justify-content-center">
  <h2>Some Reviews</h2>
  <Carousel className = "pt-1 pb-3"onSelect={this.handleNext} onClick={this.handleNext} >
  {this.state.shopObjects.slice(0,3).map(shopObject =>
  <Carousel.Item key={shopObject.id + 20}>
  <div className="row d-flex justify-content-center">
  <div className="col-md-10">
  <CardDeck >

  <ReviewElem key={shopObject.id} shopObject={shopObject} onClick={this.viewShopPage}
        isStarred={shopObject.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>

  {this.state.shopObjects.slice(3 + this.state.count * 2,(this.state.count + 1) * 2 + 3).map(shopObject1 =>
  <ReviewElem key={shopObject1.id} shopObject={shopObject1} onClick={this.viewShopPage}
        isStarred={shopObject1.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>
  )}

  </CardDeck>
  </div>
  </div>
  </Carousel.Item>
  )}

  </Carousel>
  </div>
  </div>

  </div>

      </div>
    );
  }
}

export default ViewPage;
