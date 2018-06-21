import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { StyledFirebaseAuth } from 'react-firebaseui';
import Menubar from '../../components/Menubar';
import { FluidContainer } from '../../components';
import { userLogin } from '../../actions/user';
import firebase, { uiConfig } from '../../components/firebaseAuth';
import About from './About';

const Home = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });

      if (user) {
        this.props.userLogin(user);
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return (
      <FluidContainer fluid>
        <Menubar homeLink="/" />
        <Container className="my-3 my-md-5">
          <Row>
            <Col md={7}>
              <About />
            </Col>
            <Col md={5} className="mt-5">
              <Card>
                <CardHeader tag="h4" className="font-weight-normal">
                  Login
                </CardHeader>
                <CardBody>
                  <StyledFirebaseAuth
                    uiCallback={ui => ui.disableAutoSignIn()}
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </FluidContainer>
    );
  }
};

Home.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch,
  );

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Home));
