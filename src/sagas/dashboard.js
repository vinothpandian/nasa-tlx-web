import { takeEvery, call, put } from 'redux-saga/effects';
import {
  FETCH_ALL_EXPERIMENTS_ASYNC,
  FETCH_ALL_PARTICIPANTS_ASYNC,
  PUSH_TO_DASHBOARD,
} from '../actions/dashboard';
import { fetchData, fetchParticipantData } from '../components/firebaseDatabase';

function* fetchAllExperimentsAsync(action) {
  const userID = action.payload;

  const { data, status } = yield call(fetchData, userID);

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
      experimentCount: 0,
    });
  }
}

function* fetchAllParticipantsAsync(action) {
  const { userID, expID } = yield action.payload;

  const { data, status } = yield call(fetchParticipantData, userID, expID);

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
      participantCount: 0,
    });
  }
}

export default function* watchDashboardActions() {
  yield takeEvery(FETCH_ALL_EXPERIMENTS_ASYNC, fetchAllExperimentsAsync);
  yield takeEvery(FETCH_ALL_PARTICIPANTS_ASYNC, fetchAllParticipantsAsync);
}
