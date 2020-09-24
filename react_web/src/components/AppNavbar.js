import React, { Component } from 'react'
import { Collapse, Navbar as ReactstrapNavbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Logo from './img/logo.png';
import Navbar from 'react-bootstrap/Navbar';

import { ScrollspyNavLink } from 'reactstrap-scrollspy'

class AppNavbar extends Component {
    constructor(props) {
          super()
          this.state = {
              collapsed: true
          };
      }

   toggleNavbar = () => this.setState({collapsed : !this.state.collapsed})


     render() {
       var activeClass = {Login: "visible", Logout:"visible "}
           if(this.props.isLogIn ){
               activeClass = {Login: "d-none", Logout:"visible "}
           }else
           {
             activeClass = {Login: "visible", Logout:"d-none"}
           }
  return (
    <ReactstrapNavbar expand="md" fixed="top" className="navbar-dark bg-dark">
        <Navbar.Brand href="/#home" >
<img className="pl-3" width="200" alt="logo" height= "80" src={Logo}></img>
</Navbar.Brand>

      <NavbarToggler onClick={this.toggleNavbar}>
        <span className="navbar-toggler-icon" />
      </NavbarToggler>

      <Collapse isOpen={!this.state.collapsed} navbar>
        <Nav navbar className="ml-auto" style={{ fontSize: '1.4rem' }}>
          <NavItem>
            <ScrollspyNavLink name="header">
              <NavLink href="/#header"><FaHome className="pb-1" size="25"/>Home</NavLink>
            </ScrollspyNavLink>
          </NavItem>
          <NavItem>
            <ScrollspyNavLink name="shoppingList">
              <NavLink href="#shoppingList"><FaShoppingBag className="pb-1" size="25"/>ShoppingList</NavLink>
            </ScrollspyNavLink>
          </NavItem>
          <NavItem>
            <ScrollspyNavLink name="contact">
              <NavLink href="#contact"><FaRocket className="pb-1" size="25"/>Contact</NavLink>
            </ScrollspyNavLink>
          </NavItem>
          <NavItem className={activeClass.Logout}>
          <ScrollspyNavLink name="UserProfile">
            <NavLink href="/UserProfile"><FaRegUser className="pb-1" size="25"/>UserProfile</NavLink>
          </ScrollspyNavLink>
          </NavItem>
          <NavItem className={activeClass.Logout}>
          <ScrollspyNavLink name="Cart">
            <NavLink href="/Cart"><FaShoppingCart className="pb-1" size="25"/>My Cart</NavLink>
          </ScrollspyNavLink>
          </NavItem>
          <NavItem className={activeClass.Logout}>
          <ScrollspyNavLink name="LogOut">
            <NavLink href="/LogOut"><FaSignOutAlt className="pb-1" size="25"/>LogOut</NavLink>
          </ScrollspyNavLink>
          </NavItem>
          <NavItem className={activeClass.Login}>
          <ScrollspyNavLink name="LoginPopup">
            <NavLink href="/LoginPopup"><FaSignInAlt className="pb-1" size="25"/>Login</NavLink>
          </ScrollspyNavLink>
        </NavItem>
        <NavItem className={activeClass.Login}>
          <ScrollspyNavLink name="signUp">
            <NavLink href="/signUp"><FaRegUser className="pb-1" size="25"/>SignUp</NavLink>
          </ScrollspyNavLink>
        </NavItem>
        </Nav>
      </Collapse>
    </ReactstrapNavbar>
  )}
}

export default AppNavbar
