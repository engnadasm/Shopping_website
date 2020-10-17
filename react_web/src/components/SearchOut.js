import React, { Component } from 'react';
import './SearchOut.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { FaSearch } from "react-icons/fa";
import ElementHome from './ElementSearch';
import history from './../history';

import { loadUser} from '../actions/authActions';
import axios from "axios";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../actions/itemActions';

class SearchOut extends Component {
  componentDidMount() {
    this.props.getItems();
    this.props.loadUser();
  }
  constructor(){
  super();
  this.state = {
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

        }],
    options1 : [
                          { value: 'Ladies', label: 'Ladies' },
                          { value: 'Men', label: 'Men' },
                          { value: 'Kids', label: 'Kids' },
                          { value: 'All', label: 'All' }

                        ],
    options2:[
                                      { value: 'Ladies', label: 'Ladies' },
                                      { value: 'Men', label: 'Men' },
                                      { value: 'Kids', label: 'Kids' },
                                      { value: 'All', label: 'All' }

                                    ],
    page : 0,
    isLoaded: false
  }

        this.addItem = this.addItem.bind(this);

       }

       removeItem=(shopObject)=>{
         console.log("Remove...");
         console.log("id" + shopObject._id);
           shopObject.stare = false
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
    viewShopPage=(shopObject)=>{
        console.log("clicked-----------------------")
        history.push('/ViewPage')
    }
    handlePrevious=()=>{
      console.log("Previous-----------------------")
      if(this.state.page > 0){
        this.setState({page : this.state.page -1})
      }
    }
    handleNext=()=>{
      console.log("Next-----------------------")
      if(this.state.shopObjects.length - 3 * (this.state.page + 1) > 0){
        this.setState({page : this.state.page + 1})
      }
    }

   handleChange1 = (selectedOption1) => {

        if(selectedOption1.value === 'Ladies'){
          this.setState({options2:[
                        { value: 'Dresses', label: 'Dresses' },
                        { value: 'Tops', label: 'Tops' },
                        { value: 'Shoes', label: 'Shoes' },
                        { value: 'Skirts', label: 'Skirts' },
                        { value: 'Trousers', label: 'Trousers' },
                        { value: 'Shirts & Blouses', label: 'Shirts & Blouses' },
                        { value: 'All', label: 'All' }
                      ]});
        }
        if(selectedOption1.value === 'Men'){
  this.setState({options2:[
                            { value: 'Tops & T-Shirts', label: 'Tops & T-Shirts' },
                        { value: 'Shoes', label: 'Shoes' },
                        { value: 'Jeans & Trousers', label: 'Jeans & Trousers' },
                        { value: 'Shirts', label: 'Shirts' },
                        { value: 'Jackets & Coats', label: 'Jackets & Coats' },
                        { value: 'Socks', label: 'Socks' },
                        { value: 'Blazers & Suits', label: 'Blazers & Suits' },
                        { value: 'All', label: 'All' }
                      ]});
        }
        if(selectedOption1.value === 'Kids'){
  this.setState({options2:[                        { value: 'Newborn', label: 'Newborn' },
                        { value: 'Girls 1 1/2 To 10 years', label: 'Girls 1 1/2 To 10 years' },
                        { value: 'Boys 1 1/2 To 10 years', label: 'Boys 1 1/2 To 10 years' },
                        { value: 'Girls 8 To 14+ years', label: 'Girls 8 To 14+ years' },
                        { value: 'Boys 8 To 14+ years', label: 'Boys 8 To 14+ years' },
                        { value: 'All', label: 'All' }
                      ]});
        }
    }
   handleChange2 = (selectedOption2) => {
    }

  render() {
    const it = this.props.item.items;

    if(this.props.user != null){
    console.log(this.props.user);

    const cart = this.props.user.favorite;
    const favorite = this.props.user.cart;

    console.log(cart);
    console.log(it);
    if(it.length !== 0){

    let  found;
    for(let i=0;i<cart.length;i++){
      found = it.findIndex(element => element._id === cart[i]);
      it[found].stare = true;
    }
    for(let i=0;i<favorite.length;i++){
      found = it.findIndex(element => element._id === favorite[i]);
      it[found].cart = true;
    }
    }
    console.log(it);
    }

    const animatedComponents = makeAnimated();
    return (
  	<div className="row p-3">
  	<aside className="col-md-3">

  <div className="card">
  	<article className="filter-group">
  		<header className="card-header">
  			<a href="#collapse_1" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" className="">
  				<i className="icon-control fa fa-chevron-down"></i>
  				<h6 className="title">Product Class</h6>
  			</a>
  		</header>
  		<div className="filter-content collapse show" id="collapse_1" >
  			<div className="card-body">
  				<form className="">
  				<div className="input-group">

          <Select
        onChange={this.handleChange1}
        id = "exampleFormControlSelect1"
        components={animatedComponents}
        placeholder="Select Class"
        name="colors"
        options={this.state.options1}
        className="form-control search-slt"
        classNamePrefix="select"
        />

  				  <div className="input-group-append">
  				    <button className="btn btn-light" type="button"><FaSearch/></button>
  				  </div>
  				</div>
  				</form>

  				<ul className="list-menu">

          {this.state.options1.map(classObject =>
      		  	<li  key={classObject.value}><a href="#label">{classObject.label}  </a></li>
      		 )}

  				</ul>

  			</div>
  		</div>
  	</article>
  	<article className="filter-group">
  		<header className="card-header">
  			<a href="#collapse_2" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="">
  				<i className="icon-control fa fa-chevron-down"></i>
  				<h6 className="title">Category </h6>
  			</a>
  		</header>
  		<div className="filter-content collapse show" id="collapse_2" >
  			<div className="card-body">
        {this.state.options2.map(categoryObject =>
          <label className="custom-control custom-checkbox" key={categoryObject.value}>
  				  <input type="checkbox" className="custom-control-input"/>
  				  <div className="custom-control-label">{categoryObject.label}
  				  	<b className="badge badge-pill badge-light float-right">120</b>  </div>
  				</label>
         )}
  	</div>
  		</div>
  	</article>
  	<article className="filter-group">
  		<header className="card-header">
  			<a href="#collapse_3" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" className="">
  				<i className="icon-control fa fa-chevron-down"></i>
  				<h6 className="title">Price range </h6>
  			</a>
  		</header>
  		<div className="filter-content collapse show" id="collapse_3" >
  			<div className="card-body">
  				<input type="range" className="custom-range" min="0" max="100" name=""/>
  				<div className="form-row">
  				<div className="form-group col-md-6">
  				  <label>Min</label>
  				  <input className="form-control" placeholder="$0" type="number"/>
  				</div>
  				<div className="form-group text-right col-md-6">
  				  <label>Max</label>
  				  <input className="form-control" placeholder="$1,0000" type="number"/>
  				</div>
  				</div>
  				<button className="btn btn-block btn-primary">Apply</button>
  			</div>
  		</div>
  	</article>
  	<article className="filter-group">
  		<header className="card-header">
  			<a href="#collapse_4" data-toggle="collapse" data-target="#collapse_4" aria-expanded="true" className="">
  				<i className="icon-control fa fa-chevron-down"></i>
  				<h6 className="title">Sizes </h6>
  			</a>
  		</header>
  		<div className="filter-content collapse show" id="collapse_4" >
  			<div className="card-body">
  			  <label className="checkbox-btn">
  			    <input type="checkbox"/>
  			    <span className="btn btn-light"> XS </span>
  			  </label>

  			  <label className="checkbox-btn">
  			    <input type="checkbox"/>
  			    <span className="btn btn-light"> SM </span>
  			  </label>

  			  <label className="checkbox-btn">
  			    <input type="checkbox"/>
  			    <span className="btn btn-light"> LG </span>
  			  </label>

  			  <label className="checkbox-btn">
  			    <input type="checkbox"/>
  			    <span className="btn btn-light"> XXL </span>
  			  </label>
  		</div>
  		</div>
  	</article>

  </div>

  	</aside>
  	<main className="col-md-9">

  <header className="border-bottom mb-4 pb-3">
  		<div className="form-inline">
  			<span className="mr-md-auto">{it.length} Items found </span>
  			<select className="mr-2 form-control">
  				<option>Latest items</option>
  				<option>Highest Rating</option>
  				<option>Cheapest</option>
  			</select>
  		</div>
  </header>

  <div className="row">
  {it.map(shopObject1 =>
    <ElementHome key={shopObject1._id} shopObject={shopObject1} onClick={this.viewShopPage}
          isStarred={shopObject1.stare} onStare={()=>this.addItem(shopObject1)} onRemove={this.removeItem} addCart={this.addToCart}/>
  )}

  </div>

  <nav className="mt-4" aria-label="Page navigation sample">
    <ul className="pagination">
      <li className="page-item disabled"><a className="page-link" href="#previous">Previous</a></li>
      <li className="page-item active"><a className="page-link" href="#nav1">1</a></li>
      <li className="page-item"><a className="page-link" href="#nav2">2</a></li>
      <li className="page-item"><a className="page-link" href="#nav3">3</a></li>
      <li className="page-item"><a className="page-link" href="#next">Next</a></li>
    </ul>
  </nav>

  	</main>

  	</div>

    )
  }
}
SearchOut.propTypes = {
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
)(SearchOut);
