import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { store } from './store';
import Loading from './components/Loading';

const requireAuth = (ComposedComponent) => {
  class Auth extends Component {
    componentWillMount() {
      if (!this.props.loginStatus) store.dispatch(push('/'));
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.loginStatus) store.dispatch(push('/'));
    }

    render() {
      if (this.props.loginStatus) return <ComposedComponent {...this.props} />;

      return <Loading fullScreen />;
    }
  }

  Auth.propTypes = {
    loginStatus: PropTypes.bool.isRequired,
  };

  const mapStateToProps = state => ({
    loginStatus: state.user.get('loginStatus'),
  });

  return connect(mapStateToProps)(Auth);
};

export default requireAuth;
