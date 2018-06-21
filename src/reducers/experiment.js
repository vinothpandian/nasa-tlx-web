import { handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import moment from 'moment';
import { EXPERIMENT_COMPLETE, PUSH_TO_STATE, CLEAR_EXPERIMENT_DATA } from '../actions/experiments';
import { storeData } from '../components/firebaseDatabase';

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
