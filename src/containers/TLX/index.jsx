import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Menubar from '../../components/Menubar';
import { FluidContainer } from '../../components';
import AboutTLX from './AboutTLX';
import Definitions from './Definitions';
import RatingSheet from './RatingSheet';
import CompareCards from './CompareCards';
import { syncExpDataAsync } from '../../actions/experiments';
import { store } from '../../store';
import Loading from '../../components/Loading';

const TLX = class extends React.Component {
  componentDidMount() {
    const {
      expID, partID, userID, completed,
    } = this.props;

    if (completed) {
      store.dispatch(push('/'));
    }

    if (expID === '123' || partID === '123') {
      this.props.syncExpDataAsync({ userID, ...this.props.match.params });
    }
  }

  render() {
    const { expID, partID } = this.props;

    if (expID === '123' || partID === '123') return <Loading fullScreen />;

    return (
      <FluidContainer fluid>
        <Menubar />
        <Container className="my-3 my-md-5">
          <Switch>
            <Route path="/tlx/:expID/:partID/aboutTLX" component={AboutTLX} />
            <Route path="/tlx/:expID/:partID/definitions" component={Definitions} />
            <Route path="/tlx/:expID/:partID/ratingSheet" component={RatingSheet} />
            <Route path="/tlx/:expID/:partID/compareCards" component={CompareCards} />
          </Switch>
        </Container>
      </FluidContainer>
    );
  }
};

TLX.propTypes = {
  expID: PropTypes.string.isRequired,
  partID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  syncExpDataAsync: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      expID: PropTypes.string.isRequired,
      partID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  expID: state.experiment.get('expID'),
  partID: state.experiment.get('partID'),
  userID: state.user.get('userID'),
  completed: state.experiment.get('completed'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      syncExpDataAsync,
    },
    dispatch,
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TLX));
