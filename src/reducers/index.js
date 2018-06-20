import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import experiment from './experiment';
import user from './user';
import dashboard from './dashboard';

export default combineReducers({
  user,
  experiment,
  dashboard,
  router: routerReducer,
});
