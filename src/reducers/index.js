import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import experiment from './experiment';
import user from './user';

export default combineReducers({
  user,
  experiment,
  router: routerReducer,
});
