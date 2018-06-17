import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import QuestionPair from './QuestionPair';

function QuestionCard(props) {
  return (
    <Card>
      <CardHeader>
        <h5>Question {15 - props.qNo} of 15</h5>
      </CardHeader>
      <CardBody>
        <Row className="text-center justify-content-center align-items-center p-4">
          <Col xs="12">
            <h4>
              Out of the following two workload measures, which one contributed more to the task?
            </h4>
          </Col>
          <Col className="mt-4 p-2" xs="12">
            <QuestionPair options={props.options} handleClick={props.handleClick} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

QuestionCard.propTypes = {
  qNo: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QuestionCard;
