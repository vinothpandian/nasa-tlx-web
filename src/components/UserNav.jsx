import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink href="#">Dashboard</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">
        <i className="material-icons align-middle">account_circle</i>
      </NavLink>
    </NavItem>
  </Nav>
);
