import React, { useState } from 'react'
import './Header.css';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import history from './../history';

import { connect } from 'react-redux';

function Header(props) {
  const { isAuthenticated } = props.auth;
  const animatedComponents = makeAnimated();
  const [isDisabled, setDisabled] = useState(false)
  const [options2, setOption2] = useState( [
    { value: 'All', label: 'All' }
  ])
  const options1 = [
                { value: 'Ladies', label: 'Ladies' },
                { value: 'Men', label: 'Men' },
                { value: 'Kids', label: 'Kids' },
                { value: 'All', label: 'All' }

              ];

  const [selOp1, newSelOp1] = useState( { value: 'select Your Gender', label: 'Select Gender' })
  const [selOp2, newSelOp2] = useState(  { value: 'select Category', label: 'Select Category' })

  const handleChange1 = (selectedOption1) => {
    if(isDisabled) {
      setDisabled(false);
    } else{
      newSelOp1(selectedOption1.value)
      }
      if(selectedOption1.value === 'Ladies'){
        newSelOp1(options1[0])
        setOption2([
                      { value: 'Dresses', label: 'Dresses' },
                      { value: 'Tops', label: 'Tops' },
                      { value: 'Shoes', label: 'Shoes' },
                      { value: 'Skirts', label: 'Skirts' },
                      { value: 'Trousers', label: 'Trousers' },
                      { value: 'Shirts & Blouses', label: 'Shirts & Blouses' },
                      { value: 'All', label: 'All' }
                    ]);
      }
      if(selectedOption1.value === 'Men'){
        newSelOp1(options1[1])
        setOption2([
                      { value: 'Tops & T-Shirts', label: 'Tops & T-Shirts' },
                      { value: 'Shoes', label: 'Shoes' },
                      { value: 'Jeans & Trousers', label: 'Jeans & Trousers' },
                      { value: 'Shirts', label: 'Shirts' },
                      { value: 'Jackets & Coats', label: 'Jackets & Coats' },
                      { value: 'Socks', label: 'Socks' },
                      { value: 'Blazers & Suits', label: 'Blazers & Suits' },
                      { value: 'All', label: 'All' }
                    ]);
      }
      if(selectedOption1.value === 'Kids'){
        newSelOp1(options1[2])
        setOption2([
                      { value: 'Newborn', label: 'Newborn' },
                      { value: 'Girls 1 1/2 To 10 years', label: 'Girls 1 1/2 To 10 years' },
                      { value: 'Boys 1 1/2 To 10 years', label: 'Boys 1 1/2 To 10 years' },
                      { value: 'Girls 8 To 14+ years', label: 'Girls 8 To 14+ years' },
                      { value: 'Boys 8 To 14+ years', label: 'Boys 8 To 14+ years' },
                      { value: 'All', label: 'All' }
                    ]);
      }
  }
  const handleChange2 = (selectedOption2) => {
    newSelOp2(selectedOption2.value)
  }
const search = () => {
  history.push('/SearchOut')
}

const renderButtons=()=>{
    if (isAuthenticated){ return (<div></div>)}
   else {return (<div className="">
       <a className="btn btn-theme btn-sm btn-min-block" href="/LoginPopup">Login</a>
       <a className="btn btn-theme btn-sm btn-min-block" href="/signUp">Register</a>
   </div>)}
  }

  return (
    <header id="header">
        <section>
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="https://pbs.twimg.com/media/EGHYvttU4AAYKb7?format=jpg&name=large" className="d-block w-100" alt="..."/>
                <div className="header-text">
                    <div className="col-md-12 text-center">
                        <h2 className="p-2">
                            <span>Welcome to N&S shop</span>
                        </h2>
                        <h3 className="p-2">
                          <span>The place to find the best products for every taste and occasion.</span>
                        </h3>
                        {renderButtons()}
                    </div>
                </div>
                <section className="search-sec">
    <div className="container">
        <form action="#" method="post" noValidate="noValidate">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                        <Select
        onChange={handleChange1}
        defaultValue={selOp1}
        id = "exampleFormControlSelect1"
        components={animatedComponents}
        placeholder="Select Category"
        name="colors"
        options={options1}
        className="form-control search-slt"
        classNamePrefix="select"
        />
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                        <Select
        onChange={handleChange2}
        defaultValue={selOp2}
        isDisabled = {isDisabled}
        id = "exampleFormControlSelect2"
        components={animatedComponents}
        placeholder="Select Category"
        name="colors"
        options={options2}
        className="form-control search-slt"
        classNamePrefix="select"
        />

                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                            <button type="button" className="btn btn-danger wrn-btn"onClick={search}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </section>
            </div>
            <div className="carousel-item">
                <img src="https://pbs.twimg.com/media/EGHYvtkUcAAuc8T?format=jpg&name=large" className="d-block w-100" alt="..."/>
                <div className="header-text">
                    <div className="col-md-12 text-center">
                        <h3 className="p-2">
                          <span>We aim to offer our customers a variety of the latest products.</span>
                        </h3>
                        {renderButtons()}
                    </div>
                </div>
                <section className="search-sec">
    <div className="container">
        <form action="#" method="post" noValidate="noValidate">
            <div className="row">
                <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                    <Select
    onChange={handleChange1}
    defaultValue={selOp1}
    id = "exampleFormControlSelect1"
    components={animatedComponents}
    placeholder="Select Category"
    name="colors"
    options={options1}
    className="form-control search-slt"
    classNamePrefix="select"
    />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                    <Select
    onChange={handleChange2}
    defaultValue={selOp2}
    isDisabled = {isDisabled}
    id = "exampleFormControlSelect2"
    components={animatedComponents}
    placeholder="Select Category"
    name="colors"
    options={options2}
    className="form-control search-slt"
    classNamePrefix="select"
    />

                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                        <button type="button" className="btn btn-danger wrn-btn" onClick={search}>Search</button>
                    </div>
                </div>
                </div>
            </div>
        </form>
    </div>
    </section>
            </div>
            <div className="carousel-item">
                <img src="https://pbs.twimg.com/media/EGHYvtjU0AAO8w1?format=jpg&name=large" className="d-block w-100" alt="..."/>
                <div className="header-text">
                    <div className="col-md-12 text-center">
                        <h3 className="p-2">
                          <span>We offer all of this while providing excellent customer service and friendly support.</span>
                        </h3>
                        {renderButtons()}
                    </div>
                </div>
                <section className="search-sec">
                <div className="container">
                <form action="#" method="post" noValidate="noValidate">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                    <Select
    onChange={handleChange1}
    defaultValue={selOp1}
    id = "exampleFormControlSelect1"
    components={animatedComponents}
    placeholder="Select Category"
    name="colors"
    options={options1}
    className="form-control search-slt"
    classNamePrefix="select"
    />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                    <Select
    onChange={handleChange2}
    defaultValue={selOp2}
    isDisabled = {isDisabled}
    id = "exampleFormControlSelect2"
    components={animatedComponents}
    placeholder="Select Category"
    name="colors"
    options={options2}
    className="form-control search-slt"
    classNamePrefix="select"
    />

                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <button type="button" className="btn btn-danger wrn-btn" onClick={search}>Search</button>
                    </div>
                </div>
                </form>
                </div>
                </section>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
</section>
    </header>
  )
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Header);
