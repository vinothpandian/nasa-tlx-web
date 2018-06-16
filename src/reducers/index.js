import { combineReducers } from 'redux';
import experiment from './experiment';
import user from './user';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  user,
  experiment,
  router: routerReducer,
});
