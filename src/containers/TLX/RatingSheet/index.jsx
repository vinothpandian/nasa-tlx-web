import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from './Slider';
import { storeRatingSheet } from '../../../actions/experiments';
import { shortDefinitions } from '../../../assets/definitions';
import { storeStateAsync } from '../../../actions/state';

const RatingSheet = class extends React.Component {
  constructor(props) {
    super(props);

    const defaultState = JSON.parse(localStorage.getItem('ratingSheet')) || {
      scale: {
        'Mental Demand': 50,
        'Physical Demand': 50,
        'Temporal Demand': 50,
      },
      choose: [0, 3],
    };

    this.state = defaultState;
    props.storeStateAsync('ratingSheet', defaultState);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.props.storeStateAsync('ratingSheet', nextState);

    return true;
  }

  handleChange(key, value) {
    this.setState(prevState => ({
      scale: {
        ...prevState.scale,
        [key]: value,
      },
    }));
  }

  handleClick() {
    const { experimentRef, location } = this.props;
    const { choose, scale } = this.state;

    if (_.isEqual(choose, [0, 3])) {
      this.setState(prevState => ({
        scale: {
          ...prevState.scale,
          Performance: 50,
          Effort: 50,
          'Frustration Level': 50,
        },
        choose: [3, 6],
      }));

      this.props.storeRatingSheet(experimentRef, scale);
      return;
    }

    scale.Performance = 100 - scale.Performance;

    const path = location.pathname.replace('ratingSheet', 'compareCards');
    this.props.storeRatingSheet(experimentRef, scale, true, path);
  }

  render() {
    const sliders = Object.keys(shortDefinitions)
      .splice(...this.state.choose)
      .map((key, index) => {
        const scale = shortDefinitions[key];

        return (
          <Slider
            key={key}
            id={key}
            title={key}
            description={scale.description}
            leftValue={scale.leftValue}
            rightValue={scale.rightValue}
            value={this.state.scale[key]}
            handleChange={this.handleChange}
            divider={(index + 1) % 3 !== 0}
          />
        );
      });

    return (
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader tag="h4">Rating Sheet</CardHeader>
            <CardBody>{sliders}</CardBody>
            <CardFooter className="text-right">
              <Button onClick={this.handleClick} color="primary">
                Continue
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    );
  }
};

RatingSheet.propTypes = {
  storeRatingSheet: PropTypes.func.isRequired,
  storeStateAsync: PropTypes.func.isRequired,
  experimentRef: PropTypes.shape().isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  experimentRef: state.experiment.get('experimentRef'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeRatingSheet,
      storeStateAsync,
    },
    dispatch,
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingSheet));
