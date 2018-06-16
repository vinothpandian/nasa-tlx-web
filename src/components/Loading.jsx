import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { keyframes } from 'emotion';

const Wrapper = styled.div(props => ({
  height: props.fullScreen && '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const spin = keyframes(`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`);

const Loader = styled.div`
  border: 0.5rem solid #f3f3f3;
  border-top: 0.5rem solid #3498db;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: ${spin} 2s cubic-bezier(0.22, 0.74, 0.74, 0.25) infinite;
`;

const Loading = props => (
  <Wrapper fullScreen={props.fullScreen}>
    <Loader />
  </Wrapper>
);

Loading.defaultProps = {
  fullScreen: false,
};

Loading.propTypes = {
  fullScreen: PropTypes.bool,
};

export default Loading;
