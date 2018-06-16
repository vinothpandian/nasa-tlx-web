import { createAction } from 'redux-actions';

export const SWITCH_NAME = 'SWITCH_NAME';

export const GET_NAME_ASYNC = 'GET_NAME_ASYNC';

export const switchName = createAction(SWITCH_NAME);

export const getNameAsync = createAction(GET_NAME_ASYNC);
