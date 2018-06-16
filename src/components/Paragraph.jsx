import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const Paragraph = props => (
  <Row className={props.className}>
    <Col xs="12">
      <h3>{props.title}</h3>
    </Col>
    <Col xs="12" className="text-justify">
      {props.children}
    </Col>
  </Row>
);

Paragraph.defaultProps = {
  className: 'my-4',
};

Paragraph.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Paragraph;
