import React, { useState } from 'react'
import { Collapse, Navbar as ReactstrapNavbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap'

import { ScrollspyNavLink } from 'reactstrap-scrollspy'

function AppNavbar() {
  const [collapsed, setCollapsed] = useState(true)

  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <ReactstrapNavbar expand="md" fixed="top" className="navbar-dark bg-dark">
      <a href="/" className="text-warning" style={{ textDecoration: 'none'}}>
        <h3 style={{color: '#0062cc' }}>N&S Shop</h3>
      </a>

      <NavbarToggler onClick={toggleNavbar}>
        <span className="navbar-toggler-icon" />
      </NavbarToggler>

      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar className="ml-auto" style={{ fontSize: '1.4rem' }}>
          <NavItem>
            <ScrollspyNavLink name="header">
              <NavLink href="/#header">Home</NavLink>
            </ScrollspyNavLink>
          </NavItem>
          <NavItem>
            <ScrollspyNavLink name="shoppingList">
              <NavLink href="#shoppingList">ShoppingList</NavLink>
            </ScrollspyNavLink>
          </NavItem>
          <NavItem>
            <ScrollspyNavLink name="contact">
              <NavLink href="#contact">Contact</NavLink>
            </ScrollspyNavLink>
          </NavItem>
          <NavItem>
            <ScrollspyNavLink name="LoginPopup">
              <NavLink href="/LoginPopup">Login</NavLink>
            </ScrollspyNavLink>
          </NavItem>
          <NavItem>
            <ScrollspyNavLink name="signUp">
              <NavLink href="/signUp">SignUp</NavLink>
            </ScrollspyNavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </ReactstrapNavbar>
  )
}

export default AppNavbar
