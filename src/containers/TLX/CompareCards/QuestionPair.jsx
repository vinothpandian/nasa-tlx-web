import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';

const QuestionPair = (props) => {
  const Option = props.options.map(option => (
    <Col xs={12}>
      <Button className="w-75" color="primary" name={option} onClick={props.handleClick}>
        {option}
      </Button>
    </Col>
  ));

  return (
    <Row className="text-center align-items-center">
      {Option[0]}
      <Col xs={12} className="p-2">
        <span className="lead">or</span>
      </Col>
      {Option[1]}
    </Row>
  );
};

QuestionPair.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QuestionPair;
