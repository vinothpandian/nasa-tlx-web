import React from 'react';
import { Switch, Route } from 'react-router';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import Menubar from '../../components/Menubar';
import { FluidContainer } from '../../components';
import Loading from '../../components/Loading';

const AboutTLX = Loadable({
  loader: () => import('./AboutTLX'),
  loading: Loading,
});

const Definitions = Loadable({
  loader: () => import('./Definitions'),
  loading: Loading,
});

const TLX = () => (
  <FluidContainer fluid>
    <Menubar />
    <Container className="my-3 my-md-5">
      <Switch>
        <Route path="/tlx/:expID/:partID/aboutTLX" component={AboutTLX} />
        <Route path="/tlx/:expID/:partID/definitions" component={Definitions} />
      </Switch>
    </Container>
  </FluidContainer>
);

export default withRouter(TLX);
