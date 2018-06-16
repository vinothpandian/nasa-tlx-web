import React from 'react';
import { Card, CardBody, Col, Row, CardHeader, CardFooter, Button } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import definitions from '../../../assets/definitions';

const DefinitionsModal = (props) => {
  const { expID, partID } = props.match.params;

  /* TODO: Check whether params match online and redirect to home '/' if not found */

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
            <Button color="primary" tag={NavLink} to={`/tlx/${expID}/${partID}/ratingSheet`}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

export default withRouter(DefinitionsModal);
