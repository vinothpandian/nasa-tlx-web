import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import Paragraph from '../../../components/Paragraph';
import content from '../../../assets/instructions';

const AboutTLX = (props) => {
  const { pathname } = props.location;

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader tag="h4">Instructions</CardHeader>
          <CardBody>
            <Paragraph className="mt-3">
              {content.instructions.map(paragraph => (
                <p key={paragraph.slice(0, 10)}>{paragraph}</p>
              ))}
            </Paragraph>
          </CardBody>
          <CardFooter className="text-right">
            <Button color="primary" tag={NavLink} to={pathname.replace('aboutTLX', 'definitions')}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      </Col>
    </Row>
  );
};

AboutTLX.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(AboutTLX);
