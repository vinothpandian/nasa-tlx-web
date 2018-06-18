import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  CREATE_EXPERIMENT_ASYNC,
  CREATE_EXPERIMENT,
  STORE_DATA_ASYNC,
  STORE_DATA,
  SYNC_EXP_DATA,
} from '../actions/experiments';
import { createExperiment, storeData } from '../components/firebaseDatabase';
import { store } from '../store/index';

function* createExperimentAsync(action) {
  const { userID, expID, partID } = action.payload;

  const experimentRef = yield call(createExperiment, userID, expID, partID);
  yield put({
    type: CREATE_EXPERIMENT,
    payload: {
      expID,
      partID,
      experimentRef,
    },
  });
  yield store.dispatch(push(`/tlx/${expID}/${partID}/aboutTLX`));
}

function* storeDataAsync(action) {
  const {
    experimentRef, completed, data, experimentEnd,
  } = action.payload;
  yield call(storeData, experimentRef, data);
  yield put({
    type: STORE_DATA,
    payload: data,
    experimentEnd,
  });

  if (completed) yield store.dispatch(push(action.payload.path));

  if (experimentEnd) localStorage.clear();
}

function* syncExpDataAsync(action) {
  const { userID, expID, partID } = action.payload;

  const experimentRef = yield call(createExperiment, userID, expID, partID);
  yield put({
    type: CREATE_EXPERIMENT,
    payload: {
      expID,
      partID,
      experimentRef,
    },
  });
}

export default function* watchExperimentActions() {
  yield takeEvery(CREATE_EXPERIMENT_ASYNC, createExperimentAsync);
  yield takeEvery(STORE_DATA_ASYNC, storeDataAsync);
  yield takeEvery(SYNC_EXP_DATA, syncExpDataAsync);
}
