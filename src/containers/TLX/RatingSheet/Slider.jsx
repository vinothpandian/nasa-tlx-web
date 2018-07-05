import React from 'react';
import PropTypes from 'prop-types';
import RCSlider from 'rc-slider';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';

const marks = _.range(11).reduce((acc, key) => {
  acc[key * 10] = '';
  return acc;
}, {});

const Slider = props => (
  <Row className="justify-content-center align-items-center">
    <Col xs={4}>
      <h5>{props.title}</h5>
      <p>{props.description}</p>
    </Col>
    <Col xs={8}>
      <Row className="align-items-center align-content-center" noGutters>
        <Col xs={2} className="text-right align-middle pr-3">
          {props.leftValue}
        </Col>
        <Col xs={8}>
          <RCSlider
            min={0}
            max={100}
            step={10}
            value={props.value}
            marks={marks}
            included={false}
            onChange={(value) => {
              props.handleChange(props.id, value);
            }}
          />
        </Col>
        <Col xs={2} className="text-left align-middle pl-2">
          {props.rightValue}
        </Col>
      </Row>
    </Col>
    {props.divider && (
      <Col xs="12">
        <hr />
      </Col>
    )}
  </Row>
);

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  leftValue: PropTypes.string.isRequired,
  rightValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  divider: PropTypes.bool.isRequired,
};

export default Slider;
