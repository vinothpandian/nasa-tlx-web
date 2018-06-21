import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { USER_LOGOUT_ASYNC, USER_LOGOUT } from '../actions/user';
import { signOut } from '../components/firebaseAuth';
import { store } from '../store/index';

function* userLogoutAsync() {
  const status = yield call(signOut);

  if (status === 'signOff') {
    yield put({
      type: USER_LOGOUT,
      payload: {
        loginStatus: false,
      },
    });

    yield store.dispatch(push('/'));
  }
}

export default function* watchUserActions() {
  yield takeEvery(USER_LOGOUT_ASYNC, userLogoutAsync);
}
