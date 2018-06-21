import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { StyledFirebaseAuth } from 'react-firebaseui';
import Menubar from '../../components/Menubar';
import { FluidContainer } from '../../components';
import { auth, uiConfig } from '../../components/firebase';
import About from './About';

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
