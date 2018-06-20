import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Row, CardHeader, CardFooter, Button } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import definitions from '../../../assets/definitions';

const Definitions = (props) => {
  const { pathname } = props.location;

  const data = Object.keys(definitions).map(key => (
    <React.Fragment key={key}>
      <dt className="col-md-3 col-xl-2 mt-2">{key}</dt>
      <dd className="col-md-9 col-xl-10 mt-2 text-justify">{definitions[key]}</dd>
    </React.Fragment>
  ));

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader tag="h4">Definitions</CardHeader>
          <CardBody>
            <dl className="row">{data}</dl>
          </CardBody>
          <CardFooter className="text-right">
            <Button
              color="primary"
              tag={NavLink}
              to={pathname.replace('definitions', 'ratingSheet')}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

Definitions.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Definitions);
