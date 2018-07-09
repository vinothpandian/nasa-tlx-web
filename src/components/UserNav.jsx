import React from 'react';
import { Nav, NavItem, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { push } from 'react-router-redux';
import { signOut } from './firebase';
import { store } from '../store';

const UserNav = class extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  // eslint-disable-next-line
  async handleClick(event) {
    const status = await signOut();

    if (status === 'signOff') {
      store.dispatch(push('/'));
    }
  }

  render() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Button color="link" tag={NavLink} className="nav-link" to="/dashboard">
            Dashboard
          </Button>
        </NavItem>
        <NavItem>
          <Button onClick={this.handleClick} color="link" className="nav-link">
            Logout
          </Button>
        </NavItem>
      </Nav>
    );
  }
};

export default UserNav;
