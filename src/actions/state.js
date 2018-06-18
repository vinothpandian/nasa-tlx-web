import { createAction } from 'redux-actions';

export const STORE_STATE_ASYNC = 'STORE_STATE_ASYNC';

export const storeStateAsync = createAction(STORE_STATE_ASYNC, (stateName, stateData) => ({
  name: stateName,
  state: stateData,
}));
