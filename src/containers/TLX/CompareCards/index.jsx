import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import definitions from '../../../assets/definitions';
import QuestionCard from './QuestionCard';
import { storeCompareCards } from '../../../actions/experiments';
import { storeStateAsync } from '../../../actions/state';

const CompareCards = class extends React.Component {
  constructor(props) {
    super(props);

    const choices = _.shuffle(Object.keys(definitions).reduce(
      (acc, x, i, arr) => acc.concat(arr.slice(i + 1).map(y => [x, y])),
      [],
    ));

    const defaultState = JSON.parse(localStorage.getItem('compareCards')) || {
      choices: [..._.drop(choices), 'end'],
      currentChoice: choices[0],
      workload: {
        'Mental Demand': 0,
        'Physical Demand': 0,
        'Temporal Demand': 0,
        Performance: 0,
        Effort: 0,
        'Frustration Level': 0,
      },
    };

    this.state = defaultState;
    props.storeStateAsync('compareCards', defaultState);

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.props.storeStateAsync('compareCards', nextState);

    const { experimentRef, expID, partID } = nextProps;
    const { workload } = nextState;

    const path = `/end/${expID}/${partID}`;

    if (this.state.choices[0] === 'end') {
      this.props.storeCompareCards(experimentRef, workload, true, path);
      return false;
    }

    this.props.storeCompareCards(experimentRef, workload);
    return true;
  }

  handleClick(event) {
    const { id } = event.target;

    this.setState(prevState => ({
      choices: _.drop(prevState.choices),
      currentChoice: prevState.choices[0],
      workload: { ...prevState.workload, [id]: prevState.workload[id] + 1 },
    }));
  }

  render() {
    const { choices, currentChoice } = this.state;

    return (
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={8}>
            <QuestionCard
              qNo={choices.length}
              options={currentChoice}
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
  storeCompareCards: PropTypes.func.isRequired,
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
      storeCompareCards,
      storeStateAsync,
    },
    dispatch,
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompareCards));
