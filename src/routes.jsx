import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import { history } from './store';
import Loading from './components/Loading';
import End from './containers/End';
import requireAuth from './requireAuth';

const Home = Loadable({
  loader: () => import('./containers/Home'),
  loading: () => <Loading fullScreen />,
});

const UserHome = Loadable({
  loader: () => import('./containers/UserHome'),
  loading: () => <Loading fullScreen />,
});

const TLX = Loadable({
  loader: () => import('./containers/TLX'),
  loading: () => <Loading fullScreen />,
});

const RawData = Loadable({
  loader: () => import('./containers/RawData'),
  loading: () => <Loading fullScreen />,
});

const ErrorPage = Loadable({
  loader: () => import('./containers/ErrorPage'),
  loading: () => <Loading fullScreen />,
});

const Dashboard = Loadable({
  loader: () => import('./containers/Dashboard'),
  loading: () => <Loading fullScreen />,
});

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
