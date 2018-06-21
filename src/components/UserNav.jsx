import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Nav, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogoutAsync } from '../actions/user';

const UserNav = props => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink className="nav-link" to="/dashboard">
        Dashboard
      </NavLink>
    </NavItem>
    <NavItem>
      <Button onClick={props.userLogoutAsync} color="link" className="nav-link">
        Logout
      </Button>
    </NavItem>
  </Nav>
);

UserNav.propTypes = {
  userLogoutAsync: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogoutAsync,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(UserNav);
