import { takeEvery, call, put } from 'redux-saga/effects';
import {
  FETCH_ALL_EXPERIMENTS_ASYNC,
  FETCH_ALL_PARTICIPANTS_ASYNC,
  PUSH_TO_DASHBOARD,
  FETCH_ALL_EXPERIMENT_DATA_ASYNC,
} from '../actions/dashboard';
import {
  fetchExperimentList,
  fetchExperimentData,
  fetchParticipantData,
} from '../components/firebase';

function* fetchAllExperimentsAsync() {
  const { data, status } = yield call(fetchExperimentList);

  if (status) {
    yield put({
      type: PUSH_TO_DASHBOARD,
      payload: {
        experimentCount: data.length,
        experimentList: data,
      },
    });
  } else {
    yield put({
      type: PUSH_TO_DASHBOARD,
      payload: { experimentCount: 0 },
    });
  }
}

function* fetchAllExperimentDataAsync() {
  const { data, status } = yield call(fetchExperimentData);

  if (status) {
    yield put({
      type: PUSH_TO_DASHBOARD,
      payload: {
        experimentCount: data.length,
        experimentData: data,
      },
    });
  } else {
    yield put({
      type: PUSH_TO_DASHBOARD,
      payload: { experimentCount: 0 },
    });
  }
}

function* fetchAllParticipantsAsync(action) {
  const expID = action.payload;

  const { data, status } = yield call(fetchParticipantData, expID);

  if (status) {
    yield put({
      type: PUSH_TO_DASHBOARD,
      payload: {
        participantCount: data.length,
        participantList: data,
      },
    });
  } else {
    yield put({
      type: PUSH_TO_DASHBOARD,
      payload: { participantCount: 0 },
    });
  }
}

export default function* watchDashboardActions() {
  yield takeEvery(FETCH_ALL_EXPERIMENTS_ASYNC, fetchAllExperimentsAsync);
  yield takeEvery(FETCH_ALL_EXPERIMENT_DATA_ASYNC, fetchAllExperimentDataAsync);
  yield takeEvery(FETCH_ALL_PARTICIPANTS_ASYNC, fetchAllParticipantsAsync);
}
