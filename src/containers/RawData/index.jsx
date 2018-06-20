import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FluidContainer } from '../../components';
import Menubar from '../../components/Menubar';
import UserNav from '../../components/UserNav';
import { syncExpDataAsync } from '../../actions/experiments';
import DataDisplay from './DataDisplay';
import Loading from '../../components/Loading';
import { store } from '../../store/index';
import { push } from 'react-router-redux';

const RawData = class extends React.Component {
  componentDidMount() {
    const { userID, match } = this.props;
    const { expID, partID } = match.params;

    this.props.syncExpDataAsync(userID, expID, partID);
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.experiment.completed || !nextProps.participantExists) {
      console.log(nextProps);
      // store.dispatch(push('/'));
      return false;
    }

    return true;
  }

  render() {
    const {
      expID, partID, date, ...data
    } = this.props.experiment;

    if (expID === '' || partID === '' || !data.completed) return <Loading fullScreen />;

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

RawData.propTypes = {
  syncExpDataAsync: PropTypes.func.isRequired,
  experiment: PropTypes.shape().isRequired,
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
  experiment: state.experiment.toJS(),
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
