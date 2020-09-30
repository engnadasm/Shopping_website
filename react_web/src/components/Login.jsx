import React, { Component } from 'react';
import { Modal} from "react-bootstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import {
Alert
} from 'reactstrap';
class Login extends Component {
  constructor() {
        super()

        this.state = {
          modal: true,
            valid: false,
            fields:{},
            errors:{},
            msg: null,
            emailORphone: '',
            password: ''
        }

    }

    static propTypes = {
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired,
      login: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
    };
    componentDidUpdate(prevProps) {
      const { error, isAuthenticated } = this.props;
      if (error !== prevProps.error) {
        // Check for register error
        if (error.id === 'LOGIN_FAIL') {
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

    handleSubmit = (event) =>{
      let errors = {};
      let formIsValid = true;
        if(!this.state.emailORphone){
           formIsValid = false;
           errors["emailPhone"] = "Cannot be empty";
        }

        if(typeof this.state.emailORphone !== "undefined"){
           let lastAtPos = this.state.emailORphone.lastIndexOf('@');
           let lastDotPos = this.state.emailORphone.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0
              && this.state.emailORphone.indexOf('@@') === -1 && lastDotPos > 2
           && (this.state.emailORphone.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["emailPhone"] = "Email is not valid";
            }
        }

        if(!this.state.password){
           formIsValid = false;
           errors["password"] = "Cannot be empty";
        }

       this.setState({errors: errors});
       this.setState({valid: formIsValid});
       if(formIsValid){

          event.preventDefault();

          const { emailORphone, password } = this.state;
          const user = {
            emailORphone,
            password
          };
          // Attempt to login
          this.props.login(user);

        }

  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
    this.props.onClose();
  };
  render(){

    return (

<Modal  id="LoginPopup" tabIndex="-1" aria-labelledby="LoginPopupTitle"  size="lg"
      centered
aria-hidden="true" show={this.props.showForm && this.state.modal} toggle={this.toggle} onHide={()=>this.props.onClose()}>
      <Modal.Header toggle={this.toggle} closeButton style={{backgroundColor:"#0072ff", fontFamily:"Alata"}}>
        <h5 className="modal-title" id="LoginPopupTitle">Login</h5>
      </Modal.Header>
      <Modal.Body>
      {this.state.msg ? (
        <Alert color='danger'>{this.state.msg}</Alert>
      ) : null}
        <div className="container">
          <div className="row">
          <div className="col">
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="form-group">
              <label htmlFor="emailORphone">Email/Phone</label>
                <input type="email" className="form-control"   name='emailORphone'
                  id='emailORphone' onChange={this.onChange} ></input>
                <span style={{color: "red"}}>
                 {this.state.errors["emailPhone"]}
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name='password'
                id='password'
                onChange={this.onChange}
                ></input>
                <span style={{color: "red"}}>
                 {this.state.errors["password"]}
                </span>
              </div>
            </form>
            </div>
            </div>
            <div className="row">
            <div className="col">
            <button className="btn btn-outline-primary btn-block mx-auto"><i className="fa fa-facebook"></i>  Login with Facebook</button>
            </div>
            </div>
            <div className="row">
            <div className="col">
            <button className="btn btn-outline-danger btn-block mx-auto my-2"><i className="fa fa-google"></i>  Login with Google</button>
            </div>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn" style={{backgroundColor:"#0072ff"}}
        data-dismiss="modal" onClick={()=>this.props.onClose()}>Cancel</button>
        <button type="submit" className="btn" style={{backgroundColor:"#0072ff"}}
         onClick={this.handleSubmit}>Login</button>
      </Modal.Footer>
</Modal>
)
}
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
