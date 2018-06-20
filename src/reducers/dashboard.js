import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { PUSH_TO_DASHBOARD } from '../actions/dashboard';

const defaultState = new Map();

export default handleActions(
  {
    [PUSH_TO_DASHBOARD]: (state, action) => state.merge(action.payload),
  },
  defaultState,
);
