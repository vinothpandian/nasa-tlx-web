import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Card, CardBody, CardFooter, Container } from 'reactstrap';
import { FluidContainer } from '../../components';
import Menubar from '../../components/Menubar';

const End = (props) => {
  const { expID, partID } = props.match.params;

  return (
    <FluidContainer fluid>
      <Menubar />
      <Container className="my-3 my-md-5">
        <Row className="p-5">
          <Col>
            <Card>
              <CardBody className="text-center">
                <h1 className="display-3 pt-4">Thank you for your submission</h1>
                <p className="lead p-3">
                  Please inform that you have completed the NASA-TLX questionnaire successfully
                </p>
              </CardBody>
              <CardFooter className="text-right">
                <Button color="primary" tag={NavLink} to={`/rawData/${expID}/${partID}`}>
                  Check Result
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </FluidContainer>
  );
};

End.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      expID: PropTypes.string.isRequired,
      partID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default End;
