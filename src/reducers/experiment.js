import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import {
  CREATE_EXPERIMENT,
  SYNC_EXP_DATA,
  STORE_DATA,
  CALCULATE_RESULT,
  PARTICIPANT_EXISTS,
  EXPERIMENT_COMPLETE,
} from '../actions/experiments';

const defaultState = new Map({
  expID: '123',
  partID: '123',
  experimentRef: '123',
  participantExists: false,
  scale: new Map({
    'Mental Demand': 50,
    'Physical Demand': 50,
    'Temporal Demand': 50,
    Performance: 50,
    Effort: 50,
    'Frustration Level': 50,
  }),
  workload: new Map({
    'Mental Demand': 0,
    'Physical Demand': 0,
    'Temporal Demand': 0,
    Performance: 0,
    Effort: 0,
    'Frustration Level': 0,
  }),
  completed: false,
});

export default handleActions(
  {
    [CREATE_EXPERIMENT]: (state, action) => state.merge(action.payload),
    [PARTICIPANT_EXISTS]: state =>
      state.merge({
        participantExists: true,
      }),
    [SYNC_EXP_DATA]: (state, action) => state.merge(action.payload),
    [EXPERIMENT_COMPLETE]: state =>
      state.merge({
        completed: true,
      }),
    [CALCULATE_RESULT]: (state) => {
      const adjustedRating = state
        .get('scale')
        .map((value, key) => value * state.get('workload').get(key));

      const weightedRating = adjustedRating.reduce((sum, x) => sum + x, 0) / 15;

      return state.merge({
        adjustedRating,
        weightedRating,
      });
    },
    [STORE_DATA]: (state, action) => state.merge(action.payload),
  },
  defaultState,
);
