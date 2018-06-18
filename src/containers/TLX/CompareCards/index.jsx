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
import Loading from '../../../components/Loading';

const CompareCards = class extends React.Component {
  constructor(props) {
    super(props);

    const choices = _.shuffle(Object.keys(definitions).reduce(
      (acc, x, i, arr) => acc.concat(arr.slice(i + 1).map(y => [x, y])),
      [],
    ));

    const newState = JSON.parse(localStorage.getItem('compareCards')) || {
      choices,
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

  componentDidUpdate() {
    const { experimentRef, expID, partID } = this.props;
    if (_.isEmpty(this.state.choices)) {
      this.props.storeDataAsync({
        experimentRef,
        data: {
          workload: this.state.workload,
        },
        path: `/end/${expID}/${partID}`,
        completed: true,
        experimentEnd: true,
      });
    }
  }

  handleClick(event) {
    const { id } = event.target;
    const { experimentRef } = this.props;
    const { workload } = this.state;

    const newState = { ...workload, [id]: workload[id] + 1 };

    this.setState({
      workload: newState,
    });

    const payload = {
      experimentRef,
      data: {
        workload: newState,
      },
      completed: false,
    };

    this.props.storeDataAsync(payload);

    this.setState(prevState => ({
      choices: _.drop(prevState.choices),
    }));
  }

  render() {
    const { choices } = this.state;

    if (_.isEmpty(choices)) return <Loading />;

    const currentQuestion = choices[0];

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
  expID: PropTypes.string.isRequired,
  partID: PropTypes.string.isRequired,
  storeDataAsync: PropTypes.func.isRequired,
  storeStateAsync: PropTypes.func.isRequired,
  experimentRef: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  expID: state.experiment.get('expID'),
  partID: state.experiment.get('partID'),
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
