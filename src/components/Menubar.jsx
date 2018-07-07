import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse } from 'reactstrap';
import styled from 'react-emotion';

const logo = require('../assets/Logo-lite.png');

const Image = styled.img({
  marginRight: '0.8rem',
});

const Menubar = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    const { nav, navBar, homeLink } = this.props;

    return (
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand href={homeLink}>
          <Image src={logo} alt="Logo" width="36" />
          Nasa TLX
        </NavbarBrand>
        {navBar && (
          <React.Fragment>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {nav}
            </Collapse>
          </React.Fragment>
        )}
      </Navbar>
    );
  }
};

Menubar.defaultProps = {
  nav: <Nav />,
  navBar: false,
  homeLink: '/tlx',
};

Menubar.propTypes = {
  nav: PropTypes.element,
  navBar: PropTypes.bool,
  homeLink: PropTypes.string,
};

export default Menubar;
