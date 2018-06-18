import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';

import Home from './containers/Home';
import TLX from './containers/TLX';
import End from './containers/End';
import RawData from './containers/RawData';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tlx/:expID/:partID" component={TLX} />
      <Route path="/end/:expID/:partID" component={End} />
      <Route path="/rawData/:expID/:partID" component={RawData} />
      <Route path="/dashboard" component={RawData} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
