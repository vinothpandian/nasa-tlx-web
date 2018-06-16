/* eslint react/jsx-filename-extension : off */
import React from 'react';
import { render } from 'react-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loading';
import './styles.scss';
// import App from './App';

const App = Loadable({
  loader: () => import('./App'),
  loading: () => <Loading fullScreen />,
});

render(<App />, document.querySelector('#root'));
