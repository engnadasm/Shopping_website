import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { FaSignOutAlt } from "react-icons/fa";

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>

        <NavLink href="#" onClick={this.props.logout}>
        <FaSignOutAlt className="pb-1" size="25"/>LogOut</NavLink>

      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
