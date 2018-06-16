import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  CREATE_EXPERIMENT_ASYNC,
  CREATE_EXPERIMENT,
  STORE_DATA_ASYNC,
  STORE_DATA,
} from '../actions/experiments';
import { createExperiment, storeData } from '../components/firebaseDatabase';
import { store } from '../store/index';

function* createExperimentAsync(action) {
  const { userID, payload } = action.payload;

  const experimentRef = yield call(createExperiment, userID, payload);
  yield put({
    type: CREATE_EXPERIMENT,
    payload: {
      ...payload,
      experimentRef,
    },
  });
  yield store.dispatch(push(`/tlx/${payload.expID}/${payload.partID}/aboutTLX`));
}

function* storeDataAsync(action) {
  const { userID, path, payload } = action.payload;
  yield call(storeData, userID, payload);
  yield put({
    type: STORE_DATA,
    payload: payload.scale,
  });
  yield store.dispatch(push(path));
}

export default function* watchExperimentActions() {
  yield takeEvery(CREATE_EXPERIMENT_ASYNC, createExperimentAsync);
  yield takeEvery(STORE_DATA_ASYNC, storeDataAsync);
}
