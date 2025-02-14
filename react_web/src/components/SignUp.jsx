import React, { Component } from 'react';
import './SignUp.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import axios from "axios";

class SignUp extends Component {
   constructor() {
        super()
        this.state = {
            setValidated: false,
            validated: false,
            errors:{},
            userName: '',
          date: '',
          emailORphone:'',
          password: '',
          gender: 'other',
          msg: null,
          picture: false,
  		 	   src: false
        }
    }
    handlePictureSelected(event) {
        var picture = event.target.files[0];
        var src = URL.createObjectURL(picture);

        this.setState({
          picture: picture,
          src: src
        });
    		var formData = new FormData();

    		 formData.append("file", picture)
    		 formData.append("upload_preset","insta-clone")
    		 formData.append("cloud_name","nada2020")
    		 formData.append("api_key",'466459189789469');
    		 axios
    			 .post('https://api.cloudinary.com/v1_1/nada2020/image/upload', formData, {headers: {
    					 'Content-Type': 'multipart/form-data'
    				 }})
    			 .then(response =>{
    				 console.log(response);
    				 this.setState({
    					 src: response.data.url
    				 });
    				 console.log(this.state.src);

    			 }
    			 )
    			 .catch(error => console.log(error));

      }

      renderPreview() {

        if (this.state.src) {
          return <img className="preview-img" alt="Preview"src={this.state.src} width="200" height="200" />;
        } else {
          this.setState({ src: "http://simpleicon.com/wp-content/uploads/account.png" });
          return <img className="preview-img" src="http://simpleicon.com/wp-content/uploads/account.png" alt="Preview" width="200" height="200"/>;
        }
      }

    onChange = e => {
          this.setState({ [e.target.name]: e.target.value });
        };
  handleSubmit = (event) => {
    let errors={}
    const formEl = event.currentTarget
    if (formEl.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      for(let i=0; i<formEl.length; i++) {
                const elem = formEl[i];
                console.log(elem)
                const errorLabel = elem.parentNode.querySelector('.invalid-message');

                if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
                  console.log(elem.nodeName.toLowerCase())
                    if (!elem.validity.valid) {
                      console.log(errorLabel.getAttribute("id"))
                      errors[errorLabel.getAttribute("id")] = elem.validationMessage;
                    } else {
                        errorLabel.textContent = '';
                    }
                }
      }
      console.log("invalid")
    } else {
      event.preventDefault();

      const { userName, emailORphone, password,gender , src } = this.state;

      // Create user object
      const newUser = {
        userName,
        emailORphone,
        password,
        gender,
        src
      };

      // Attempt to register
      this.props.register(newUser);
    console.log("valid_1")

    }
    this.setState({errors: errors});
    this.setState({ validated: true });
    console.log("valid")
  };
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  render(){
  	return (
  		<div className="container" style={{marginTop:"5%"}} id="signUp">
  			<div className="row col">
  				<div className="col-md-5">
          <div className="container">
          <div className="row">
          <div className="col">
          <h4 className="titles">Sign up with phone number</h4>
          </div>
          </div>

          <div className="row">
          <div className="col">
          <div className="preview form-group text-center">
          {this.renderPreview()}
                  <div className="browse-button">
                      <i className="fa fa-pencil-alt"></i>
                      <input className="browse-input file-upload" type="file"  name="file"
                      data-cloudinary-field="image_id" accept="image/*"
                     data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
                      id="UploadedFile"
                      onChange={this.handlePictureSelected.bind(this)}/>
                  </div>
                  <span className="Error"></span>
              </div>
              </div>
              </div>

          <div className="row">
          <div className="col">
  				  <form noValidate onSubmit={this.handleSubmit.bind(this)}>
  				   	<div className="form-group">
    					<label htmlFor="inputName1">User Name</label>
   					    <input type="name" className="form-control" id="inputName1" placeholder="User Name"
                name="userName"
                onChange={this.onChange}required></input>
                <span style={{color: "red"}} className="invalid-message" id="userName1">
                {this.state.errors["userName1"]}
                </span>
 					    </div>
  					  <div className="form-group">
    					  <label htmlFor="inputPhone">Phone Number</label>
   					    <input type="tel" className="form-control" id="inputPhone" placeholder="123-45-678"
                name="emailORphone"
                onChange={this.onChange} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required></input>
 					      <span style={{color: "red"}} className="invalid-message" id="phone">
                {this.state.errors["phone"]}
                </span>
              </div>
 					    <div className="form-group">
    					  <label htmlFor="inputPassword1">Password</label>
   					    <input type="password" className="form-control" id="inputPassword1" placeholder="password"
                name="password"
                onChange={this.onChange} minLength={6} pattern="(?=.*\d)(?=.*[a-z]).{6,}"required></input>
                <small className="form-text text-muted">Must be at least 6 characters long, contain letters and numbers</small>
                <span style={{color: "red"}} className="invalid-message" id="pass1">
                  {this.state.errors["pass1"]}
                </span>
 					    </div>

              <div className="form-group">
              <label className="pr-3">Gender:</label>
              <input type="radio" id="male2" name="gender" value="male"
              onChange={this.onChange} required></input>
            <label className="pr-2" htmlFor="male2">Male</label>
            <input type="radio" id="female2" name="gender" value="female"
            onChange={this.onChange}  required></input>
            <label htmlFor="female2">Female</label>
            <span style={{color: "red"}} className="invalid-message" id="gender2">
            {this.state.errors["gender2"]}
            </span>
            </div>

              <button className="btn btn-outline-dark float-right" type="submit"><i className="fa fa-sign-in"></i> Sign up</button>
  				  </form>
            </div>
            </div>
            <div className="row">
            <div className="col">
          <div className="d-flex flex-row my-3 d-md-none">
             <div className="col"><hr/></div>
             <div className="col-auto">OR</div>
             <div className="col"><hr/></div>
             </div>
          </div>
          </div>
  				</div>
          </div>
          <span className="border-left border-secondary m-5 d-none d-md-block" style={{height: "500px"}}></span>

  				<div className="col-md-5">
          <div className="container">
          <div className="row">
          <div className="col">
          <h4 className="titles">Sign up with email address</h4>
          </div>
          </div>

          <div className="row">
          <div className="col">
          <div className="preview form-group text-center">
          {this.renderPreview()}
                  <div className="browse-button">
                      <i className="fa fa-pencil-alt"></i>
                      <input className="browse-input file-upload" type="file"  name="file"
                      data-cloudinary-field="image_id" accept="image/*"
                     data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
                      id="UploadedFile"
                      onChange={this.handlePictureSelected.bind(this)}/>
                  </div>
                  <span className="Error"></span>
              </div>
              </div>
              </div>

              <div className="row">
              <div className="col">
  			     <form noValidate onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="inputName2">User Name</label>
                <input type="name" name="userName"
                onChange={this.onChange} className="form-control" id="inputName2" placeholder="User Name" required></input>
                <span style={{color: "red"}} className="invalid-message" id="userName2">
                {this.state.errors["userName2"]}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="iputEmail">Email Address</label>
                <input type="email" name="emailORphone"
                onChange={this.onChange}
                className="form-control" id="iputEmail" placeholder="name@example.com" required></input>
                <span style={{color: "red"}} className="invalid-message" id="email">
                {this.state.errors["email"]}
                </span>
              </div>
              <div className="form-group">
              <label htmlFor="inputPassword2">Password</label>
                <input type="password"name="password"
                onChange={this.onChange} className="form-control" id="inputPassword2"  placeholder="password" minLength={6} pattern="(?=.*\d)(?=.*[a-z]).{6,}"required></input>
                <small className="form-text text-muted">Must be at least 6 characters long, contain letters and numbers</small>
                <span style={{color: "red"}} className="invalid-message" id="pass2">
                  {this.state.errors["pass2"]}
                </span>
              </div>
              <div className="form-group">
              <label className="pr-3">Gender:</label>
              <input type="radio" id="male1" name="gender" value="male"
              onChange={this.onChange} required></input>
            <label className="pr-2" htmlFor="male1">Male</label>
            <input type="radio" id="female1" name="gender" value="female"
            onChange={this.onChange}  required></input>
            <label htmlFor="female1">Female</label>
            <span style={{color: "red"}} className="invalid-message" id="gender1">
            {this.state.errors["gender1"]}
            </span>
            </div>
              <button className="btn btn-outline-dark float-right" type="submit"><i className="fa fa-sign-in"></i> Sign up</button>
            </form>
            </div>
            </div>
             <div className="row">
            <div className="col">
          <div className="d-flex flex-row my-3">
             <div className="col"><hr/></div>
             <div className="col-auto">OR</div>
             <div className="col"><hr/></div>
             </div>
          </div>
          </div>
            <div className="row my-3">
            <div className="col">
            <h4 className="titles">Sign up with social media</h4>
            </div>
            </div>
            <div className="row">
            <div className="col">
            <button className="btn btn-outline-primary btn-block mx-auto"><i className="fa fa-facebook"></i>  Sign up with Facebook</button>
            </div>
            </div>
            <div className="row">
            <div className="col">
            <button className="btn btn-outline-danger btn-block mx-auto my-2"><i className="fa fa-google"></i>  Sign up with Google</button>
            </div>
            </div>
            </div>
  				</div>
  			</div>

  		</div>
  		)
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(SignUp);
