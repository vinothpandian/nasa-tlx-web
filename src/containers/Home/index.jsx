import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ExperimentCard from './Experiment';
import Default from './Default';

const Home = props => (props.loginStatus ? <ExperimentCard /> : <Default />);

Home.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loginStatus: state.user.get('loginStatus'),
});

export default withRouter(connect(mapStateToProps)(Home));
