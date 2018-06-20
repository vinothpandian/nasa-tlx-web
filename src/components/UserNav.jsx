import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink className="nav-link" to="/dashboard">
        Dashboard
      </NavLink>
    </NavItem>
  </Nav>
);
