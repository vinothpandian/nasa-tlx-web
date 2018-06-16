import { handleAction } from 'redux-actions';
import { Map } from 'immutable';
import { CREATE_EXPERIMENT } from '../actions/experiments';

const defaultState = new Map({
  experimentID: '123',
  participantID: '123',
  experimentRef: '123',
});

export default handleAction(
  CREATE_EXPERIMENT,
  (state, action) => {
    const { experimentID, participantID, experimentRef } = action.payload;

    return state.merge({
      experimentID,
      participantID,
      experimentRef,
    });
  },
  defaultState,
);
