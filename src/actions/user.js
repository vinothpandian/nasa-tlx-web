import { createAction } from 'redux-actions';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_ASYNC = 'USER_LOGOUT_ASYNC';

export const userLogin = createAction(USER_LOGIN);
export const userLogoutAsync = createAction(USER_LOGOUT_ASYNC);
