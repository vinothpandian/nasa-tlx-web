import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  CREATE_EXPERIMENT_ASYNC,
  SYNC_EXP_DATA_ASYNC,
  EXPERIMENT_COMPLETE,
  PUSH_TO_STATE,
  STORE_RATING_SHEET,
  STORE_COMPARE_CARDS,
} from '../actions/experiments';
import { createExperiment, storeData, syncExperiment } from '../components/firebaseDatabase';
import { store } from '../store';

function* createExperimentAsync(action) {
  const { userID, expID, partID } = action.payload;

  const { experimentRef, status } = yield call(createExperiment, userID, expID, partID);

  if (!status) {
    yield put({
      type: PUSH_TO_STATE,
      payload: {
        expID,
        partID,
        experimentRef,
        completed: false,
        participantExists: true,
      },
    });
    yield store.dispatch(push(`/tlx/${expID}/${partID}/aboutTLX`));
  } else {
    yield put({
      type: PUSH_TO_STATE,
      payload: {
        participantExists: true,
      },
    });
  }
}

function* syncExpDataAsync(action) {
  const { userID, expID, partID } = action.payload;

  const { experimentRef, data, status } = yield call(syncExperiment, userID, expID, partID);

  if (status) {
    yield put({
      type: PUSH_TO_STATE,
      payload: {
        expID,
        partID,
        experimentRef,
        participantExists: true,
        ...data,
      },
    });
  } else {
    yield put({
      type: PUSH_TO_STATE,
      payload: {
        participantExists: false,
      },
    });
  }
}

function* storeRatingSheetAsync(action) {
  const {
    experimentRef, data, status, path,
  } = action.payload;

  yield call(storeData, experimentRef, data);

  yield put({
    type: PUSH_TO_STATE,
    payload: data,
  });

  if (status) yield store.dispatch(push(path));
}

function* storeCompareCards(action) {
  const {
    experimentRef, data, status, path,
  } = action.payload;

  yield call(storeData, experimentRef, data);

  yield put({
    type: PUSH_TO_STATE,
    payload: data,
  });

  if (status) {
    yield put({
      type: EXPERIMENT_COMPLETE,
    });

    yield store.dispatch(push(path));
  }
}

export default function* watchExperimentActions() {
  yield takeEvery(CREATE_EXPERIMENT_ASYNC, createExperimentAsync);
  yield takeEvery(SYNC_EXP_DATA_ASYNC, syncExpDataAsync);
  yield takeEvery(STORE_RATING_SHEET, storeRatingSheetAsync);
  yield takeEvery(STORE_COMPARE_CARDS, storeCompareCards);
}
