import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';

import Home from './containers/Home';
import TLX from './containers/TLX';
import End from './containers/End';
import RawData from './containers/RawData';
import ErrorPage from './containers/ErrorPage';
import Dashboard from './containers/Dashboard';
import UserHome from './containers/UserHome';
import requireAuth from './requireAuth';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tlx" component={requireAuth(UserHome)} />
      <Route path="/tlx/:expID/:partID" component={requireAuth(TLX)} />
      <Route exact path="/end/:expID/:partID" component={requireAuth(End)} />
      <Route exact path="/rawData/:expID/:partID" component={requireAuth(RawData)} />
      <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
      <Route exact path="/error" component={ErrorPage} />
      <Route component={ErrorPage} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
