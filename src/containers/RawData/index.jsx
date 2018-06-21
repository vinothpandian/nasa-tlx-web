import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import { FluidContainer } from '../../components';
import Menubar from '../../components/Menubar';
import UserNav from '../../components/UserNav';
import { syncExpDataAsync } from '../../actions/experiments';
import DataDisplay from './DataDisplay';
import Loading from '../../components/Loading';
import { store } from '../../store/index';
import ErrorPage from '../ErrorPage/index';

const RawData = class extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    const { expID, partID } = match.params;

    this.props.syncExpDataAsync(expID, partID);
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.participantExists) {
      store.dispatch(push('/'));
      return false;
    }

    return true;
  }

  render() {
    const {
      expID, partID, date, ...data
    } = this.props.experiment;

    if (expID === '' || partID === '' || _.isEmpty(data)) return <Loading fullScreen />;

    if (!_.isEmpty(data) && !data.completed) {
      return (
        <ErrorPage
          message="Incomplete data"
          notification="User has not filled the entire questionnaire"
          clearExperiment={false}
        />
      );
    }

    return (
      <FluidContainer fluid>
        <Menubar nav={<UserNav />} navBar />
        <Container className="my-3 my-md-5">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h3 className="font-weight-normal">
                    {`Raw data of Participant "${partID}" in Experiment "${expID}"`}
                  </h3>
                  <h5 className="font-weight-light">Experiment performed at {date}</h5>
                </CardHeader>
                <DataDisplay data={data} />
              </Card>
            </Col>
          </Row>
        </Container>
      </FluidContainer>
    );
  }
};

RawData.defaultProps = {
  participantExists: true,
};

RawData.propTypes = {
  syncExpDataAsync: PropTypes.func.isRequired,
  participantExists: PropTypes.bool,
  experiment: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      expID: PropTypes.string.isRequired,
      partID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  experiment: state.experiment.toJS(),
  participantExists: state.experiment.get('participantExists'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      syncExpDataAsync,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawData);
