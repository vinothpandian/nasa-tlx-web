import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import experiment from './experiment';
import dashboard from './dashboard';

export default combineReducers({
  experiment,
  dashboard,
  router: routerReducer,
});
