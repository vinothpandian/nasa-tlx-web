import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menubar from '../../../components/Menubar';
import { FluidContainer } from '../../../components';
import About from './About';
import { uiConfig, auth } from '../../../components/firebaseAuth';
import { userLogin } from '../../../actions/user';

const Default = props => (
  <FluidContainer fluid>
    <Menubar />
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
              <StyledFirebaseAuth uiConfig={uiConfig(props.userLogin)} firebaseAuth={auth} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </FluidContainer>
);

Default.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(Default);
