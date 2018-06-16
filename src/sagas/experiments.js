import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE_EXPERIMENT_ASYNC, CREATE_EXPERIMENT } from '../actions/experiments';
import { createExperiment } from '../components/firebaseDatabase';
import { store } from '../store/index';

function* createExperimentAsync(action) {
  const experimentRef = yield call(createExperiment, action.payload);
  yield put({
    type: CREATE_EXPERIMENT,
    payload: {
      ...action.payload,
      experimentRef,
    },
  });
  yield store.dispatch(push(`/tlx/${action.payload.experimentID}/${action.payload.participantID}/aboutTLX`));
}

export default function* watchCreateExperimentAsync() {
  yield takeEvery(CREATE_EXPERIMENT_ASYNC, createExperimentAsync);
}
