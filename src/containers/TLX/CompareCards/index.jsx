import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'reactstrap';
import _ from 'lodash';
import { Map, List } from 'immutable';
import definitions from '../../../assets/definitions';
import QuestionCard from './QuestionCard';

const CompareCards = class extends React.Component {
  constructor(props) {
    super(props);

    const choices = new List(_.shuffle(Object.keys(definitions).reduce(
      (acc, x, i, arr) => acc.concat(arr.slice(i + 1).map(y => [x, y])),
      [],
    )));

    this.state = {
      choices: choices.shift(),
      currentQuestion: choices.first(),
      workload: new Map({
        'Mental Demand': 0,
        'Physical Demand': 0,
        'Temporal Demand': 0,
        Performance: 0,
        Effort: 0,
        'Frustration Level': 0,
      }),
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const { id } = event.target;

    this.setState(prevState => ({
      workload: prevState.workload.updateIn([id], val => val + 1),
    }));

    if (this.state.choices.isEmpty()) {
      return;
    }

    this.setState(prevState => ({
      choices: prevState.choices.shift(),
      currentQuestion: prevState.choices.first(),
    }));
  }

  render() {
    const { choices, currentQuestion } = this.state;

    return (
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={8}>
            <QuestionCard
              qNo={choices.size}
              options={currentQuestion}
              handleClick={this.handleClick}
            />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default withRouter(CompareCards);
