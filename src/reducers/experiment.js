import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { CREATE_EXPERIMENT, STORE_DATA } from '../actions/experiments';

const defaultState = new Map({
  expID: '123',
  partID: '123',
  experimentRef: '123',
});

export default handleActions(
  {
    [CREATE_EXPERIMENT]: (state, action) => {
      const { expID, partID, experimentRef } = action.payload;

      return state.merge({
        expID,
        partID,
        experimentRef,
      });
    },
    [STORE_DATA]: (state, action) => state.merge(action.payload),
  },
  defaultState,
);
