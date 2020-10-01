import React, { Component } from "react";
import "./UserProfile.css";
import ElementHome from "./ElementFav";

class UserProfile extends Component {
constructor(){
	super()
	this.state={
		count : 0,
		data : "Profile",
        currentPass:"",
        newPass:"",
        confirmNewPass:"",
        checkMessage: "",
        matching: "",
        shopObjects: []
	}
	this.nameRef = React.createRef();
	this.emailRef = React.createRef();
	this.workRef = React.createRef();
}

	setProfile=()=>{
		this.setState({data : "Profile"});
	}
	setFavourites=()=>{
		this.setState({data : "Favourites"});
		if(this.state.shopObjects.length === 0){
			this.setState({
				shopObjects : [
									{id:1,
									image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
									title:'Title1',
									rating:3,
									price:'5 $',
									stare : true, class : "Men" , category : 'Shoes'
									},
									{id:2,
									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
									title:'Title2',
									rating:4,
									price:'6 $',
									stare : true, class : "Men" , category : 'Shoes'

									},
									{id:3,
									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
									 title:'Title3',
									 rating:2,
									price:'7 $',
									stare : true, class : "Ladies" , category : 'Shoes'

									},
									{id:4,
									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
									 title:'Titl4',
									 rating:2,
									price:'8 $',
									stare : true, class : "Ladies" , category : 'Shoes'

								},
									{id:5,
									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
									title:'9 $',
									rating:4,
									price:'price5',
									stare : true, class : "Ladies" , category : 'Shoes'

									},
									{id:6,
									 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
									 title:'Title6',
									 rating:2,
									price:'10 $',
									stare : true, class : "Ladies" , category : 'Tops'

								},
								{id:7,
								 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
								 title:'Title7',
								 rating:2,
								price:'11 $',
								stare : true, class : "Ladies" , category : 'Tops'

							},{id:8,
							 image:'https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg',
							 title:'Title8',
							 rating:3,
							price:'12 $',
							stare : true, class : "Ladies" , category : 'Tops'

							}]
					});
		}

	}
	setPassword=()=>{
		this.setState({data : "Password"});
	}
	handleCurrentPass=(e)=>{
		this.setState({currentPass: e.target.value});
	}
	handleNewPass=(e)=>{
		this.setState({newPass: e.target.value});
	}
	handleConfirmNewPass=(e)=>{
			this.setState({confirmNewPass: e.target.value});
			 if(this.state.newPass === e.target.value) {
		        this.setState({matching: ""});
		    } else {
		        this.setState({matching: "The two passwords are not matched."});
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
	handleSubmit=()=> {
	    if(this.state.newPass === this.state.confirmNewPass) {
	        this.setState({checkMessage: "Your password have changed."});
	    } else {
	        this.setState({checkMessage: "Some error occured during password change."});
	    }
	}
	enableEditing=()=>{
		this.nameRef.current.disabled = false;
		this.emailRef.current.disabled = false;
		this.workRef.current.disabled = false;
	}
	viewShopPage=(shopObject)=>{
		var index = this.state.shopObjects.indexOf(shopObject);
   		 if (index > -1) {
		console.log("view-----------------------")
        console.log(shopObject)
		}
    }
    removeItem=(shopObject)=>{
        console.log("remove-----------------------")
        console.log(shopObject)
        var newShopObjects = [...this.state.shopObjects];
        var index = newShopObjects.indexOf(shopObject);
   		 if (index > -1) {
   		 	newShopObjects.splice(index, 1);
        	this.setState({shopObjects: newShopObjects});
    	 }

    }
	renderData=()=>{
		if(this.state.data === "Password"){
		return(	<div>
				<h3>Change Password</h3>
				<label htmlFor="currentPassword">Enter your current password</label>
                <input type="password"id="currentPassword" className="form-control" placeholder="Old Password" onChange={this.handleCurrentPass} value={this.state.currentPass}></input>
                <div className="col"><hr/></div>
			    <label htmlFor="newPassword">Enter your new password</label>
                <input type="password"id="newPassword" className="form-control" placeholder="New Password" minLength={6} pattern="(?=.*\d)(?=.*[a-z]).{6,}" onChange={this.handleNewPass} value={this.state.newPass}></input>
                <small className="form-text text-muted">Must be at least 6 characters long, contain letters and numbers</small>
                <label htmlFor="confirmNewPassword">Confirm your new password</label>
                <input type="password"id="confirmNewPassword" className="form-control" placeholder="Confirm New Password" onChange={this.handleConfirmNewPass} value={this.state.confirmNewPass}></input>
                <span style={{color : "red"}}>{this.state.matching}</span>
                <div><button className="btn btn-outline-dark float-right my-4" onClick={this.handleSubmit}>Update Pasword</button></div>
                <h5 style={{color : "blue"}}>{this.state.checkMessage}</h5>
                </div>)
		}
		if(this.state.data === "Profile"){
		return(	<div>
				<div>
				<h3 className="d-inline">My Profile</h3>
				<button className="btn btn-outline-dark float-right" onClick={this.enableEditing}><i className="fa fa-pencil"></i>Edit</button>
				</div>
				<label htmlFor="userName">User Name</label>
				<input disabled ref={this.nameRef} type="text" id="userName" className="form-control" placeholder="User Name" value="User Name"></input>
			    <label htmlFor="email">Email</label>
                <input disabled ref={this.emailRef} type="email"id="email" className="form-control" placeholder="name@example.com" value="name@example.com"></input>
                <label htmlFor="Work">Work</label>
                <input disabled ref={this.workRef} type="text"id="Work" className="form-control" placeholder="-" value="work"></input>
                <label className="pr-3">Gender:</label>
                <input type="radio" id="male" name="gender" value="male"></input>
				<label className="pr-2" htmlFor="male">Male</label>
				<input type="radio" id="female" name="gender" value="female"></input>
				<label htmlFor="female">Female</label><br/>
				<div><button className="btn btn-outline-dark float-right my-4">Save Changes</button></div>
                </div>)
		}
		if(this.state.data === "Favourites"){
		return(
			<div>
				<h3>My Favourites</h3>

		{this.state.shopObjects.slice(0,3).map(shopObject =>
		  <ElementHome key={shopObject.id} shopObject={shopObject} onClick={this.viewShopPage}
		          isStarred={shopObject.stare} onStare={this.addItem} onRemove={this.removeItem} addCart={this.addToCart}/>

		 )}

</div>
				)
		}


	}
	render() {
		const content = this.renderData()
		var activeClass = {Profile: "nav-link active", Favourites:"nav-link ", Password:"nav-link"}
		if(this.state.data === "Favourites"){
			activeClass = {Profile: "nav-link ", Favourites:"nav-link  active", Password:"nav-link"}
		}else if(this.state.data === "Password"){
			activeClass = {Profile: "nav-link ", Favourites:"nav-link ", Password:"nav-link  active"}
		}
        return (
					<div className="container">
				 <ul className="nav nav-tabs justify-content-center">
				  <li className="nav-item">
				    <a href="#profile" className={activeClass.Profile} style={{color: '#0062cc'}} onClick={this.setProfile}>Profile</a>
				  </li>
				  <li className="nav-item">
				    <a href="#favourites" className={activeClass.Favourites} style={{color: '#0062cc'}} onClick={this.setFavourites}>Favourites</a>
				  </li>
				  <li className="nav-item">
				    <a href="#password"className={activeClass.Password} style={{color: '#0062cc'}} onClick={this.setPassword}>Change Password</a>
				  </li>
				</ul>
				<div className="row">
				<div className="col-md-3">
				<div className="mycontainer">
				<img href="#picUser" className="circular-img" alt="userPic" src={"https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg"}/>
				<button className="btn"><i className="fa fa-pencil"></i>Edit</button>
				<h3>User name</h3>
				</div>
				</div>
				<span className="border-left border-secondary m-5 d-none d-md-block" style={{height: "500px"}}></span>
				<div className="col-md-7 my-5">
				{content}
				</div>
			</div>
        	</div>);
    }
	}
export default UserProfile;
