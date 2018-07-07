import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Col, Row, Card, CardText, CardHeader, CardBody } from 'reactstrap';
import { shortDefinitions } from '../../../assets/definitions';

const ClickableCard = styled(Card)({
  boxShadow: '0px 0px 6px 0px rgba(0,0,0,0.125)',
  userSelect: 'none',
  cursor: 'pointer',

  '&:hover': {
    boxShadow: '0px 4px 6px 0px rgba(0,0,0,0.125)',
  },
});

const QuestionPair = (props) => {
  const Option = props.options.map(option => (
    <ClickableCard
      tag={Col}
      key={option}
      id={option}
      onClick={props.handleClick(option)}
      lg={5}
      className="p-0 mt-4 mt-lg-0"
    >
      <CardHeader className="bg-primary text-white" tag="h6">
        {option}
      </CardHeader>
      <CardBody>
        <CardText className="text-left">{shortDefinitions[option].description}</CardText>
      </CardBody>
    </ClickableCard>
  ));

  return <Row className="text-center justify-content-around align-items-stretch">{Option}</Row>;
};

QuestionPair.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default QuestionPair;
