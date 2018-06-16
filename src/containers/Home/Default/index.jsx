import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Menubar from '../../../components/Menubar';
import { FluidContainer } from '../../../components';
import About from './About';

const Default = () => (
  <FluidContainer fluid>
    <Menubar />
    <Container className="my-3 my-md-5">
      <Row>
        <Col md={8} lg={7}>
          <About />
        </Col>
        <Col
          md={{
            size: 4,
          }}
          lg={{
            size: 4,
            offset: 1,
          }}
          className="mt-5"
        >
          <ListGroup>
            <ListGroupItem>Sign in using Google</ListGroupItem>
            <ListGroupItem>Sign in using Facebook</ListGroupItem>
            <ListGroupItem>Sign in using Twitter</ListGroupItem>
            <ListGroupItem>Sign in using Email</ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  </FluidContainer>
);

export default Default;
