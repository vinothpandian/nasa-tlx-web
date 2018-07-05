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
    const { expID, partID, completed } = this.props;

    if (completed) {
      store.dispatch(push('/'));
    }

    if (expID === '' || partID === '') {
      const { params } = this.props.match;

      this.props.syncExpDataAsync(params.expID, params.partID);
    }
  }

  shouldComponentUpdate(nextProps) {
    const { completed, participantExists } = nextProps;

    if (!participantExists || completed === true) {
      store.dispatch(push('/error'));
      return false;
    }

    return true;
  }

  render() {
    const { expID, partID, completed } = this.props;

    if (expID === '' || partID === '' || completed) return <Loading fullScreen />;

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

TLX.defaultProps = {
  expID: '',
  partID: '',
  completed: false,
  participantExists: true,
};

TLX.propTypes = {
  expID: PropTypes.string,
  partID: PropTypes.string,
  completed: PropTypes.bool,
  participantExists: PropTypes.bool,
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
