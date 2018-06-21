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
  UncontrolledAlert,
} from 'reactstrap';
import { createExperimentAsync, clearExperimentData } from '../../../actions/experiments';
import { FluidContainer, FullHeightRow } from '../../../components';
import Menubar from '../../../components/Menubar';
import UserNav from '../../../components/UserNav';
import InputWithFeedback from '../../../components/InputWithFeedback';

const logo = require('../../../assets/NasaLogo.png');

class ExperimentCard extends Component {
  constructor(props) {
    super(props);

    localStorage.removeItem('ratingSheet');
    localStorage.removeItem('compareCards');
    props.clearExperimentData();

    this.participantExists = false;

    this.state = {
      expID: {
        value: 'Test',
        error: false,
        errorText: 'Please enter an experiment ID',
      },
      partID: {
        value: 'P1',
        error: false,
        errorText: 'Please enter an participant ID',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setObjectState = this.setObjectState.bind(this);
    this.setRandomPartID = this.setRandomPartID.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    this.participantExists = nextProps.participantExists;

    return true;
  }

  setObjectState(obj, key, value) {
    this.setState(prevState => ({
      [obj]: {
        ...prevState[obj],
        [key]: value,
      },
    }));
  }

  setRandomPartID() {
    this.setObjectState('partID', 'value', shortID());
  }

  handleClick() {
    const { expID, partID } = this.state;
    const { userID } = this.props;

    let error = false;

    if (!expID.value && expID.value === '') {
      this.setObjectState('expID', 'error', true);
      error = true;
    }

    if (!partID.value && partID.value === '') {
      this.setObjectState('partID', 'error', true);
      error = true;
    }

    if (error) return;

    this.props.createExperimentAsync(userID, expID.value, partID.value);
  }

  handleChange = prop => (event) => {
    const { value } = event.target;

    this.setObjectState(prop, 'value', value);
    this.setObjectState(prop, 'error', false);
  };

  render() {
    const { expID, partID } = this.state;
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
                      name="expID"
                      label="Experiment ID"
                      value={expID.value}
                      error={expID.error}
                      errorText={expID.errorText}
                      handleChange={this.handleChange('expID')}
                    />
                    <InputWithFeedback
                      name="partID"
                      label="Participant ID"
                      value={partID.value}
                      error={partID.error}
                      errorText={partID.errorText}
                      buttonLabel="Random"
                      buttonColor="secondary"
                      addon
                      buttonAction={this.setRandomPartID}
                      handleChange={this.handleChange('partID')}
                    />
                  </Form>
                  {this.participantExists && (
                    <UncontrolledAlert color="danger">User exists</UncontrolledAlert>
                  )}
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

ExperimentCard.defaultProps = {
  participantExists: false,
};

ExperimentCard.propTypes = {
  userID: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  createExperimentAsync: PropTypes.func.isRequired,
  clearExperimentData: PropTypes.func.isRequired,
  participantExists: PropTypes.bool,
};

const mapStateToProps = state => ({
  userID: state.user.get('userID'),
  username: state.user.get('username'),
  participantExists: state.experiment.get('participantExists'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createExperimentAsync,
      clearExperimentData,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperimentCard);
