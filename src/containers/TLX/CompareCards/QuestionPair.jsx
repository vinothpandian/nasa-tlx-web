import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row, Card, CardText } from 'reactstrap';
import { shortDefinitions } from '../../../assets/definitions';

const QuestionPair = (props) => {
  const Option = props.options.map(option => (
    <Card tag={Col} key={option} lg={5} className="p-2 mt-4 mt-lg-0" body>
      <Button color="primary" name={option} onClick={props.handleClick}>
        {option}
      </Button>
      <CardText className="p-2 text-left">{shortDefinitions[option].description}</CardText>
    </Card>
  ));

  return <Row className="text-center justify-content-around align-items-stretch">{Option}</Row>;
};

QuestionPair.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QuestionPair;
