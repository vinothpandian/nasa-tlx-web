import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import Home from './containers/Home';
import TLX from './containers/TLX';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tlx/:expID/:partID" component={TLX} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
