import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import moment from 'moment';
import { EXPERIMENT_COMPLETE, PUSH_TO_STATE, CLEAR_EXPERIMENT_DATA } from '../actions/experiments';
import { storeData } from '../components/firebase';

/*
{
  scale: new Map({
    Effort: 30,
    'Frustration Level': 90,
    'Mental Demand': 80,
    Performance: 20,
    'Physical Demand': 10,
    'Temporal Demand': 100,
  }),
  completed: true,
  adjustedRating: new Map({
    Effort: 120,
    'Frustration Level': 450,
    'Mental Demand': 0,
    Performance: 60,
    'Physical Demand': 10,
    'Temporal Demand': 200,
  }),
  partID: 'rky7a1_ZQ',
  participantExists: true,
  weightedRating: 56,
  experimentRef: 'https://nasa-tlx.firebaseio.com/NvTI1mpnvkyHxkmcGeFHRg/Test/rky7a1_ZQ',
  workload: new Map({
    Effort: 4,
    'Frustration Level': 5,
    'Mental Demand': 0,
    Performance: 3,
    'Physical Demand': 1,
    'Temporal Demand': 2,
  }),
  expID: 'Test',
  date: 'June 20th 2018, 5:43:47 pm',
}
 */

const defaultState = new Map();

export default handleActions(
  {
    [PUSH_TO_STATE]: (state, action) => state.merge(fromJS(action.payload)),
    [EXPERIMENT_COMPLETE]: (state) => {
      const adjustedRating = state
        .get('scale')
        .map((value, key) => value * state.get('workload').get(key));

      const weightedRating = (adjustedRating.reduce((sum, x) => sum + x, 0) / 15).toFixed(2);

      const calculatedData = {
        adjustedRating: adjustedRating.toJS(),
        weightedRating: parseFloat(weightedRating),
        completed: true,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      };

      storeData(state.get('experimentRef'), calculatedData);

      localStorage.removeItem('ratingSheet');
      localStorage.removeItem('compareCards');

      return state.merge(calculatedData);
    },
    [CLEAR_EXPERIMENT_DATA]: () => defaultState,
  },
  defaultState,
);
