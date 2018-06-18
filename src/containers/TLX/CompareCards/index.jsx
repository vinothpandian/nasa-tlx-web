import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import definitions from '../../../assets/definitions';
import QuestionCard from './QuestionCard';
import { storeDataAsync } from '../../../actions/experiments';
import { storeStateAsync } from '../../../actions/state';

const CompareCards = class extends React.Component {
  constructor(props) {
    super(props);

    const choices = _.shuffle(Object.keys(definitions).reduce(
      (acc, x, i, arr) => acc.concat(arr.slice(i + 1).map(y => [x, y])),
      [],
    ));

    const newState = JSON.parse(localStorage.getItem('compareCards')) || {
      choices: _.drop(choices),
      currentQuestion: choices[0],
      workload: {
        'Mental Demand': 0,
        'Physical Demand': 0,
        'Temporal Demand': 0,
        Performance: 0,
        Effort: 0,
        'Frustration Level': 0,
      },
    };

    this.state = newState;
    props.storeStateAsync('compareCards', newState);

    this.listener = null;

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.props.storeStateAsync('compareCards', nextState);

    return true;
  }

  handleClick(event) {
    const { id } = event.target;

    this.setState(prevState => ({
      workload: { ...prevState.workload, [id]: prevState.workload[id] + 1 },
    }));

    const { experimentRef } = this.props;
    const { workload } = this.state;

    const payload = {
      experimentRef,
      path: '/end',
      data: {
        workload,
      },
    };

    if (_.isEmpty(this.state.choices)) {
      this.props.storeDataAsync({ ...payload, completed: true, experimentEnd: true });
      return;
    }

    this.props.storeDataAsync(payload);

    this.setState(prevState => ({
      choices: _.drop(prevState.choices),
      currentQuestion: prevState.choices[0],
    }));
  }

  render() {
    const { choices, currentQuestion } = this.state;

    return (
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={8}>
            <QuestionCard
              qNo={choices.length}
              options={currentQuestion}
              handleClick={this.handleClick}
            />
          </Col>
        </Row>
      </Container>
    );
  }
};

CompareCards.propTypes = {
  storeDataAsync: PropTypes.func.isRequired,
  storeStateAsync: PropTypes.func.isRequired,
  experimentRef: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  experimentRef: state.experiment.get('experimentRef'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      storeDataAsync,
      storeStateAsync,
    },
    dispatch,
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompareCards));
