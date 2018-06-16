import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortID from 'shortid';
import { bindActionCreators } from 'redux';
import {
  Col,
  Form,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Button,
} from 'reactstrap';
import { createExperimentAsync } from '../../../actions/experiments';
import { FluidContainer, FullHeightRow } from '../../../components';
import Menubar from '../../../components/Menubar';
import UserNav from '../../../components/UserNav';
import InputWithFeedback from '../../../components/InputWithFeedback';

const logo = require('../../../assets/NasaLogo.png');

class ExperimentCard extends Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    createExperimentAsync: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      experimentID: {
        value: shortID(),
        error: false,
        errorText: 'Please enter an experiment ID',
      },
      participantID: {
        value: shortID(),
        error: false,
        errorText: 'Please enter an participant ID',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setObjectState = this.setObjectState.bind(this);
  }

  setObjectState = (obj, key, value) => {
    this.setState(prevState => ({
      [obj]: {
        ...prevState[obj],
        [key]: value,
      },
    }));
  };

  setRandomParticipantID = () => {
    this.setObjectState('participantID', 'value', shortID());
  };

  handleClick = () => {
    const { experimentID, participantID } = this.state;
    let error = false;

    if (!experimentID.value && experimentID.value === '') {
      this.setObjectState('experimentID', 'error', true);
      error = true;
    }

    if (!participantID.value && participantID.value === '') {
      this.setObjectState('participantID', 'error', true);
      error = true;
    }

    if (error) return;

    this.props.createExperimentAsync(this.props.userID, experimentID.value, participantID.value);
  };

  handleChange = prop => (event) => {
    const { value } = event.target;

    this.setObjectState(prop, 'value', value);
    this.setObjectState(prop, 'error', false);
  };

  render() {
    const { experimentID, participantID } = this.state;
    const { username } = this.props;

    return (
      <FluidContainer fluid>
        <Menubar navBar nav={<UserNav />} />
        <Container>
          <FullHeightRow justify="center" align="center">
            <Col xs={8} sm={6} md={4} lg={3} className="my-4 my-md-0">
              <img src={logo} alt="NasaTLX" className="img-fluid" />
            </Col>
            <Col
              xs={11}
              md={{ size: 7, offset: 1 }}
              lg={{ size: 5, offset: 1 }}
              className="text-left my-4 my-md-0"
            >
              <Card>
                <CardHeader tag="h4">Hello {username} </CardHeader>
                <CardBody>
                  <CardText>Fill the details below to get started</CardText>
                  <Form>
                    <InputWithFeedback
                      name="experimentID"
                      label="Experiment ID"
                      value={experimentID.value}
                      error={experimentID.error}
                      errorText={experimentID.errorText}
                      handleChange={this.handleChange('experimentID')}
                    />
                    <InputWithFeedback
                      name="participantID"
                      label="Participant ID"
                      value={participantID.value}
                      error={participantID.error}
                      errorText={participantID.errorText}
                      buttonLabel="Random"
                      buttonColor="secondary"
                      addon
                      buttonAction={this.setRandomParticipantID}
                      handleChange={this.handleChange('participantID')}
                    />
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.handleClick} className="px-5" color="primary">
                    Start
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </FullHeightRow>
        </Container>
      </FluidContainer>
    );
  }
}

const mapStateToProps = state => ({
  userID: state.user.get('userID'),
  username: state.user.get('username'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createExperimentAsync,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperimentCard);
