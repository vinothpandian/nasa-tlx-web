import { takeEvery } from 'redux-saga/effects';
import { STORE_STATE_ASYNC } from '../actions/state';

function* storeStateAsync(action) {
  const { name, state } = action.payload;

  yield localStorage.setItem(name, JSON.stringify(state));
}

export default function* watchStateActions() {
  yield takeEvery(STORE_STATE_ASYNC, storeStateAsync);
}
