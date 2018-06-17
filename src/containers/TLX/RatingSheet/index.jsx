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
import { shortDefinitions } from '../../../assets/definitions';

const RatingSheet = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: new Map({
        'Mental Demand': 50,
        'Physical Demand': 50,
        'Temporal Demand': 50,
        Performance: 50,
        Effort: 50,
        'Frustration Level': 50,
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
    const sliders = Object.keys(shortDefinitions)
      .splice(...this.state.choose)
      .map((key) => {
        const scale = shortDefinitions[key];

        return (
          <Slider
            key={key}
            id={key}
            title={key}
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
