import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { push } from 'react-router-redux';
import Menubar from '../../components/Menubar';
import { FluidContainer } from '../../components';
import { auth, uiConfig } from '../../components/firebase';
import About from './About';
import { store } from '../../store/index';

const gitHubLogo = require('../../assets/logo-github.svg');

const GitHubNav = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink href="https://github.com/vinothpandian/nasa-tlx-web">
        <span className="align-middle">GitHub</span>
        <span className="ml-2">
          <img src={gitHubLogo} alt="GitHub" width="24" />
        </span>
      </NavLink>
    </NavItem>
  </Nav>
);

const Home = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });

      if (user) {
        store.dispatch(push('/tlx'));
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <FluidContainer fluid>
        <Menubar homeLink="/" navBar nav={<GitHubNav />} />
        <Container className="my-3 my-md-5">
          <Row>
            <Col md={7}>
              <About />
            </Col>
            <Col md={5} className="mt-5 mt-md-0">
              <Card>
                <CardHeader tag="h4" className="font-weight-normal">
                  Login
                </CardHeader>
                <CardBody>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </FluidContainer>
    );
  }
};

export default withRouter(Home);
