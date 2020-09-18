import React, { useState,setState } from 'react'
import './Header.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import history from '../history';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

export default class SearchSec {
  static instance = null;
  static createInstance() {
    var object = new SearchSec();

    return object;
  }
  static state = {
          selOp1: "as",
          selOp2:"asc",
          isDisabled:true,
          options1 : [
                        { value: 'Ladies', label: 'Ladies' },
                        { value: 'Men', label: 'Men' },
                        { value: 'Kids', label: 'Kids' },
                        { value: 'All', label: 'All' }

                      ]
      };
static getInstance () {
    if (!SearchSec.instance) {
        SearchSec.instance = SearchSec.createInstance();
    }
    return SearchSec.instance;
}

  handleChange1 = (selectedOption1) => {
    console.log("enter........");
      if(SearchSec.state.isDisabled) {
          SearchSec.state.isDisabled= false
      } else{
      SearchSec.state.selOp1=selectedOption1.value
        }
        if(selectedOption1.value === 'Ladies'){
        SearchSec.state.options2=[
                        { value: 'Dresses', label: 'Dresses' },
                        { value: 'Tops', label: 'Tops' },
                        { value: 'Shoes', label: 'Shoes' },
                        { value: 'Skirts', label: 'Skirts' },
                        { value: 'Trousers', label: 'Trousers' },
                        { value: 'Shirts & Blouses', label: 'Shirts & Blouses' },
                        { value: 'All', label: 'All' }
                      ]
        }
        if(selectedOption1.value === 'Men'){
        SearchSec.state.options2=[
                        { value: 'Tops & T-Shirts', label: 'Tops & T-Shirts' },
                        { value: 'Shoes', label: 'Shoes' },
                        { value: 'Jeans & Trousers', label: 'Jeans & Trousers' },
                        { value: 'Shirts', label: 'Shirts' },
                        { value: 'Jackets & Coats', label: 'Jackets & Coats' },
                        { value: 'Socks', label: 'Socks' },
                        { value: 'Blazers & Suits', label: 'Blazers & Suits' },
                        { value: 'All', label: 'All' }
                      ]
        }
        if(selectedOption1.value === 'Kids'){
        SearchSec.state.options2=[
                        { value: 'Newborn', label: 'Newborn' },
                        { value: 'Girls 1 1/2 To 10 years', label: 'Girls 1 1/2 To 10 years' },
                        { value: 'Boys 1 1/2 To 10 years', label: 'Boys 1 1/2 To 10 years' },
                        { value: 'Girls 8 To 14+ years', label: 'Girls 8 To 14+ years' },
                        { value: 'Boys 8 To 14+ years', label: 'Boys 8 To 14+ years' },
                        { value: 'All', label: 'All' }
                      ]
        }

    }
   handleChange2 = (selectedOption2) => {
      SearchSec.state.selOp2=selectedOption2.value
    }
    render(){

  return (
                <section className="search-sec">
                <div className="container">
                <form action="#" method="post" novalidate="novalidate">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                    <Select
    onChange={this.handleChange1}
    defaultValue={SearchSec.state.selOp1}
    id = "exampleFormControlSelect1"
    components={animatedComponents}
    placeholder="Select Category"
    name="colors"
    options={SearchSec.state.options1}
    className="form-control search-slt"
    classNamePrefix="select"
    />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                    <Select
    onChange={this.handleChange2}
    defaultValue={SearchSec.state.selOp2}
    isDisabled = {SearchSec.state.isDisabled}
    id = "exampleFormControlSelect2"
    components={animatedComponents}
    placeholder="Select Category"
    name="colors"
    options={SearchSec.state.options2}
    className="form-control search-slt"
    classNamePrefix="select"
    />

                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                        <button type="button" className="btn btn-danger wrn-btn">Search</button>
                    </div>
                </div>
                </form>
                </div>
                </section>
  )
}
}
