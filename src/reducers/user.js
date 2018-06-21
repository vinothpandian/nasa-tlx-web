import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { USER_LOGIN, USER_LOGOUT } from '../actions/user';

const defaultState = new Map(JSON.parse(localStorage.getItem('userData')) || {
  loginStatus: false,
});

export default handleActions(
  {
    [USER_LOGIN]: (_, action) => {
      const currentUser = action.payload;

      const userData = {
        loginStatus: true,
        userID: currentUser.uid,
        username: currentUser.displayName,
      };

      localStorage.setItem('userData', JSON.stringify(userData));

      return new Map(userData);
    },
    [USER_LOGOUT]: () => {
      localStorage.clear();
      return new Map({
        loginStatus: false,
      });
    },
  },
  defaultState,
);
