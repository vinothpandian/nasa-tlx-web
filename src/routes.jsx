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

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tlx/:expID/:partID" component={TLX} />
      <Route exact path="/end/:expID/:partID" component={End} />
      <Route path="/rawData/:expID/:partID" component={RawData} />
      <Route path="/dashboard" component={Dashboard} />
      <Route exact path="/error" component={ErrorPage} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
