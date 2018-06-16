import React from 'react';
import { Switch, Route } from 'react-router';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Menubar from '../../components/Menubar';
import { FluidContainer } from '../../components';
import AboutTLX from './AboutTLX';
import Definitions from './Definitions';
import RatingSheet from './RatingSheet';

const TLX = () => (
  <FluidContainer fluid>
    <Menubar />
    <Container className="my-3 my-md-5">
      <Switch>
        <Route path="/tlx/:expID/:partID/aboutTLX" component={AboutTLX} />
        <Route path="/tlx/:expID/:partID/definitions" component={Definitions} />
        <Route path="/tlx/:expID/:partID/ratingSheet" component={RatingSheet} />
      </Switch>
    </Container>
  </FluidContainer>
);

export default withRouter(TLX);
