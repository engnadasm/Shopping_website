import React, { Component } from 'react';
import './Contact.css';
import { connect } from 'react-redux';
import { addMessage } from '../actions/messageActions';

class Contact extends Component {
     constructor() {
          super()

          this.state = {
              setValidated: false,
              validated: false,
              errors:{},
              userName: '',
            email: '',
            phone: '',
            message: ''
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

      const newMessage = {
        userName: this.state.userName,
        email: this.state.email,
        phone: this.state.phone,
        message: this.state.message
      };

      // Add User via addUser action
      this.props.addMessage(newMessage);
      console.log("valid_1")

      }
      this.setState({errors: errors});
      this.setState({ validated: true });
      console.log("valid")
      };

      render(){
      return (
      <div className=" contact-form"  id="contact">
              <div className="contact-image">
                  <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
              </div>
              <form  noValidate onSubmit={this.handleSubmit.bind(this)} >
                  <h3>Drop Us a Message</h3>
                 <div className="row">
                      <div className="col-md-6">
                          <div className="form-group">
                              <input name="userName"
                              onChange={this.onChange} className="form-control" placeholder="Your Name *"
                              type="name"  id="inputName1"
                              required></input>
                              <span style={{color: "red"}} className="invalid-message" id="userName1">
                              {this.state.errors["userName1"]}
                              </span>
                          </div>
                          <div className="form-group">
                              <input type="text" name="email"
                              onChange={this.onChange} className="form-control" id="iputEmail" required
                               placeholder="Your Email(name@example.com) *" />
                               <span style={{color: "red"}} className="invalid-message" id="email">
                               {this.state.errors["email"]}
                               </span>
                          </div>
                          <div className="form-group">
                              <input name="phone"
                              onChange={this.onChange} className="form-control" placeholder="Your Phone Number *"
                              type="tel"  id="inputPhone"
                              pattern="[0-9]{11}" required></input>
               					      <span style={{color: "red"}} className="invalid-message" id="phone">
                              {this.state.errors["phone"]}
                              </span>
                          </div>
                          <div className="form-group">
                              <input type="submit" name="btnSubmit" className="btnContact" value="Send Message" />
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="form-group">
                              <textarea name="message" type="text"
                              onChange={this.onChange}  className="form-control" placeholder="Your Message *" id="iputMessage" required
                              style={{width: "100%", height: "150px"}}></textarea>
                              <span style={{color: "red"}} className="invalid-message" id="message">
                              {this.state.errors["message"]}
                              </span>
                          </div>
                      </div>
                  </div>
              </form>
  </div>

)
}
}

const mapStateToProps = state => ({
  message: state.message
});

export default connect(
  mapStateToProps,
  { addMessage }
)(Contact);
