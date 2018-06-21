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
  CardBody,
  CardText,
  CardFooter,
  Button,
  CardHeader,
  UncontrolledAlert,
} from 'reactstrap';
import { List } from 'immutable';
import { createExperimentAsync, clearExperimentData } from '../../actions/experiments';
import { FluidContainer, FullHeightRow } from '../../components';
import Menubar from '../../components/Menubar';
import UserNav from '../../components/UserNav';
import InputWithFeedback from '../../components/InputWithFeedback';
import { getUserInfo } from '../../components/firebase';
import { fetchAllExperimentsAsync } from '../../actions/dashboard';
import InputWithAutocomplete from '../../components/InputWithAutocomplete';

const logo = require('../../assets/NasaLogo.png');

class UserHome extends Component {
  constructor(props) {
    super(props);

    localStorage.removeItem('ratingSheet');
    localStorage.removeItem('compareCards');
    props.clearExperimentData();

    this.participantExists = false;

    this.getUserName();

    this.state = {
      username: '',
      expID: {
        value: '',
        error: false,
        errorText: 'Please enter an experiment ID',
      },
      partID: {
        value: '',
        error: false,
        errorText: 'Please enter an participant ID',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setObjectState = this.setObjectState.bind(this);
    this.setRandomPartID = this.setRandomPartID.bind(this);
    this.getUserName = this.getUserName.bind(this);
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
    this.setObjectState('partID', 'error', false);
  }

  getUserName() {
    getUserInfo().then(user =>
      this.setState({
        username: user.username,
      }));
  }

  handleClick() {
    const { expID, partID } = this.state;

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

    this.props.createExperimentAsync(expID.value, partID.value);
  }

  handleChange = prop => (value) => {
    this.setObjectState(prop, 'value', value);
    this.setObjectState(prop, 'error', false);
  };

  render() {
    const { expID, partID, username } = this.state;

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
                    <InputWithAutocomplete
                      fetchItems={this.props.fetchAllExperimentsAsync}
                      items={this.props.experimentList}
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

UserHome.defaultProps = {
  experimentList: new List(),
  participantExists: false,
};

UserHome.propTypes = {
  experimentList: PropTypes.instanceOf(List),
  fetchAllExperimentsAsync: PropTypes.func.isRequired,
  createExperimentAsync: PropTypes.func.isRequired,
  clearExperimentData: PropTypes.func.isRequired,
  participantExists: PropTypes.bool,
};

const mapStateToProps = state => ({
  participantExists: state.experiment.get('participantExists'),
  experimentList: state.dashboard.get('experimentList'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllExperimentsAsync,
      createExperimentAsync,
      clearExperimentData,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserHome);
