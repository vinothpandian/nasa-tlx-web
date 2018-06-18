import React from 'react';
import { Switch, Route } from 'react-router';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menubar from '../../components/Menubar';
import { FluidContainer } from '../../components';
import AboutTLX from './AboutTLX';
import Definitions from './Definitions';
import RatingSheet from './RatingSheet';
import CompareCards from './CompareCards';
import { syncExpData } from '../../actions/experiments';

const TLX = class extends React.Component {
  componentDidMount() {
    const { expID, partID, userID } = this.props;

    if (expID === '123' || partID === '123') {
      this.props.syncExpData({ userID, ...this.props.match.params });
    }
  }

  render() {
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

const mapStateToProps = state => ({
  expID: state.experiment.get('expID'),
  partID: state.experiment.get('partID'),
  userID: state.user.get('userID'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      syncExpData,
    },
    dispatch,
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(TLX));
