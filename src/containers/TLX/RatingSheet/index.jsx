import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap';
import { Map } from 'immutable';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from './Slider';
import { storeDataAsync } from '../../../actions/experiments';

const scales = {
  mental: {
    title: 'Mental Demand',
    description: 'How mentally demanding was the task?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  physical: {
    title: 'Physical Demand',
    description: 'How physically demanding was the task?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  temporal: {
    title: 'Temporal Demand',
    description: 'How hurried or rushed was the pace of the task?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  performance: {
    title: 'Performance',
    description: 'How successful were you in accomplishing the task?',
    leftValue: 'Poor',
    rightValue: 'Good',
  },
  effort: {
    title: 'Effort',
    description: 'How hard did you have to work to accomplish your level of performance?',
    leftValue: 'Low',
    rightValue: 'High',
  },
  frustration: {
    title: 'Frustration Level',
    description: 'How insecure, discouraged, irritated, stressed, or annoyed were you?',
    leftValue: 'Low',
    rightValue: 'High',
  },
};

const RatingSheet = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: new Map({
        mental: 50,
        physical: 50,
        temporal: 50,
        performance: 50,
        effort: 50,
        frustration: 50,
      }),
      choose: [0, 3],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(id, value) {
    this.setState(prevState => ({
      scale: prevState.scale.set(id, value),
    }));
  }

  handleClick() {
    const { choose, scale } = this.state;

    if (_.isEqual(choose, [0, 3])) {
      this.setState({
        choose: [3, 6],
      });
      return;
    }

    const { expID, partID } = this.props.match.params;
    const { userID } = this.props;

    const payload = {
      userID,
      path: `/tlx/${expID}/${partID}/compareCards`,
      payload: {
        expID,
        partID,
        scale,
      },
    };

    this.props.storeDataAsync(payload);
  }

  render() {
    const sliders = Object.keys(scales)
      .splice(...this.state.choose)
      .map((key) => {
        const scale = scales[key];

        return (
          <Slider
            key={key}
            id={key}
            title={scale.title}
            description={scale.description}
            leftValue={scale.leftValue}
            rightValue={scale.rightValue}
            handleChange={this.handleChange}
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
              <Button onClick={this.handleClick} color="success">
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
  storeDataAsync: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      expID: PropTypes.string.isRequired,
      partID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  userID: state.user.get('userID'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeDataAsync,
    },
    dispatch,
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingSheet));
