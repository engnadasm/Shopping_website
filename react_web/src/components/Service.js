import React, { Component} from 'react'
import ElementHome from './ElementHome';
import Carousel from 'react-bootstrap/Carousel';
import CardDeck from 'react-bootstrap/CardDeck';
import './Service.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import history from './../history';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../actions/itemActions';

class Service extends Component {
  componentDidMount() {
    this.props.getItems();
  }
       constructor() {
            super()

              this.state = {
                count : 0,
                shopObjects : [
                          {id:1,
                          image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                          title:'Title1',
                          rating:3,
                          price:'5 $',
                          stare : false, class : "Men" , category : 'Shoes'
                          },
                          {id:2,
                           image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                          title:'Title2',
                          rating:4,
                          price:'6 $',
                          stare : false, class : "Men" , category : 'Shoes'

                          },
                          {id:3,
                           image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                           title:'Title3',
                           rating:2,
                          price:'7 $',
                          stare : false, class : "Ladies" , category : 'Shoes'

                          },
                          {id:4,
                           image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                           title:'Titl4',
                           rating:2,
                          price:'8 $',
                          stare : false, class : "Ladies" , category : 'Shoes'

                        },
                          {id:5,
                           image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                          title:'9 $',
                          rating:4,
                          price:'price5',
                          stare : false, class : "Ladies" , category : 'Shoes'

                          },
                          {id:6,
                           image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                           title:'Title6',
                           rating:2,
                          price:'10 $',
                          stare : false, class : "Ladies" , category : 'Tops'

                        },
                        {id:7,
                         image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                         title:'Title7',
                         rating:2,
                        price:'11 $',
                        stare : false, class : "Ladies" , category : 'Tops'

                      },{id:8,
                       image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
                       title:'Title8',
                       rating:3,
                      price:'12 $',
                      stare : false, class : "Ladies" , category : 'Tops'

                      }]
              }
              this.handleNext = this.handleNext.bind(this);
              this.addItem = this.addItem.bind(this);

        }

        viewShopPage=(shopObject)=>{
          console.log("viewShopPage...");
          history.push('/ViewPage')

        }
        removeItem=(shopObject)=>{
          console.log("Remove...");
            shopObject.stare = false
        }

        addItem=(shopObjects)=>{
          console.log("add...");
          shopObjects.stare = true
        }
        addToCart=(shopObjects)=>{
          console.log("addToCart...");
          history.push('/Cart')
        }
  handleNext=()=>{
         if(this.state.count >= (this.state.shopObjects.length / 3 - 1)){
            this.setState({count : 0})
          }
          else if(  this.state.count >= 0){
         this.setState({count:  this.state.count + 1})
          }
  }

  render(){
    const it = this.props.item.items;

  return (
    <Carousel className = "p-3"onSelect={this.handleNext} onClick={this.handleNext}id="shoppingList" >
{it.slice(0,3).map(shopObject =>
  <Carousel.Item key={shopObject.id + 20}>
  <div className="row d-flex justify-content-center">
  <div className="col-md-10">
  <CardDeck >

  <ElementHome key={shopObject.id} shopObject={shopObject} onClick={this.viewShopPage}
          isStarred={shopObject.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>

  {it.slice(3 + this.state.count * 2,(this.state.count + 1) * 2 + 3).map(shopObject1 =>
    <ElementHome key={shopObject1.id} shopObject={shopObject1} onClick={this.viewShopPage}
          isStarred={shopObject1.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>
  )}

  </CardDeck>
  </div>
  </div>
  </Carousel.Item>
 )}

 </Carousel>
  )}
}

Service.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems}
)(Service);
