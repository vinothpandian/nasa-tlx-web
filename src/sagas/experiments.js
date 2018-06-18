import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  CREATE_EXPERIMENT_ASYNC,
  CREATE_EXPERIMENT,
  STORE_DATA_ASYNC,
  STORE_DATA,
  SYNC_EXP_DATA,
  SYNC_EXP_DATA_ASYNC,
  EXPERIMENT_COMPLETE,
  PARTICIPANT_EXISTS,
} from '../actions/experiments';
import { createExperiment, storeData, syncExperiment } from '../components/firebaseDatabase';
import { store } from '../store/index';

function* createExperimentAsync(action) {
  const { userID, expID, partID } = action.payload;

  const { experimentRef, status } = yield call(createExperiment, userID, expID, partID);

  if (!status) {
    yield put({
      type: CREATE_EXPERIMENT,
      payload: {
        expID,
        partID,
        experimentRef,
        completed: false,
        participantExists: false,
      },
    });
    yield store.dispatch(push(`/tlx/${expID}/${partID}/aboutTLX`));
  } else {
    yield put({
      type: PARTICIPANT_EXISTS,
    });
  }
}

function* syncExpDataAsync(action) {
  const { userID, expID, partID } = action.payload;

  const { experimentRef, data } = yield call(syncExperiment, userID, expID, partID);
  yield put({
    type: SYNC_EXP_DATA,
    payload: {
      expID,
      partID,
      experimentRef,
      ...data,
    },
  });
}

function* storeDataAsync(action) {
  const {
    experimentRef, completed, data, experimentEnd,
  } = action.payload;
  yield call(storeData, experimentRef, data);
  yield put({
    type: STORE_DATA,
    payload: data,
  });

  if (completed) yield store.dispatch(push(action.payload.path));

  if (experimentEnd) {
    yield call(storeData, experimentRef, { completed: true });
    yield put({
      type: EXPERIMENT_COMPLETE,
    });
  }
}

export default function* watchExperimentActions() {
  yield takeEvery(CREATE_EXPERIMENT_ASYNC, createExperimentAsync);
  yield takeEvery(SYNC_EXP_DATA_ASYNC, syncExpDataAsync);
  yield takeEvery(STORE_DATA_ASYNC, storeDataAsync);
}
