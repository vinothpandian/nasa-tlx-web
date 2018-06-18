import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { FluidContainer } from '../../components';
import Menubar from '../../components/Menubar';
import UserNav from '../../components/UserNav';

const RawData = (props) => {
  const { expID, partID } = props.match.params;

  return (
    <FluidContainer fluid>
      <Menubar nav={<UserNav />} navBar />
      <Container className="my-3 my-md-5">
        <h1>ExpID : {expID} </h1>
        <h1>PartID : {partID} </h1>
      </Container>
    </FluidContainer>
  );
};

RawData.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      expID: PropTypes.string.isRequired,
      partID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RawData;
