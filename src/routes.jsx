import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import { history } from './store';
import Loading from './components/Loading';

const Home = Loadable({
  loader: () => import('./containers/Home'),
  loading: Loading,
});

const TLX = Loadable({
  loader: () => import('./containers/TLX'),
  loading: Loading,
});

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tlx/:expID/:partID" component={TLX} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
