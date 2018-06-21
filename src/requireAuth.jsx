import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { store } from './store';
import Loading from './components/Loading';
import { auth } from './components/firebase';

const requireAuth = (ComposedComponent) => {
  class Auth extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isSignedIn: false,
      };
    }

    componentDidMount() {
      this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
        this.setState({ isSignedIn: !!user });

        if (!user) {
          store.dispatch(push('/'));
        }
      });
    }

    componentWillUnmount() {
      this.unregisterAuthObserver();
    }

    render() {
      if (this.state.isSignedIn) return <ComposedComponent {...this.props} />;

      return <Loading fullScreen />;
    }
  }

  return Auth;
};

export default requireAuth;
