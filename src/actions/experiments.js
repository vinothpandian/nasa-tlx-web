import { createAction } from 'redux-actions';

export const PUSH_TO_STATE = 'PUSH_TO_STATE';
export const EXPERIMENT_COMPLETE = 'EXPERIMENT_COMPLETE';

export const CLEAR_EXPERIMENT_DATA = 'CLEAR_EXPERIMENT_DATA';
export const clearExperimentData = createAction(CLEAR_EXPERIMENT_DATA);

export const CREATE_EXPERIMENT_ASYNC = 'CREATE_EXPERIMENT_ASYNC';
export const createExperimentAsync = createAction(
  CREATE_EXPERIMENT_ASYNC,
  (userID, expID, partID) => ({
    userID,
    expID,
    partID,
  }),
);

export const SYNC_EXP_DATA_ASYNC = 'SYNC_EXP_DATA_ASYNC';
export const syncExpDataAsync = createAction(SYNC_EXP_DATA_ASYNC, (userID, expID, partID) => ({
  userID,
  expID,
  partID,
}));

export const STORE_RATING_SHEET = 'STORE_RATING_SHEET';
export const storeRatingSheet = createAction(
  STORE_RATING_SHEET,
  (experimentRef, scale, status = false, path = '') => ({
    experimentRef,
    data: { scale },
    status,
    path,
  }),
);

export const STORE_COMPARE_CARDS = 'STORE_COMPARE_CARDS';
export const storeCompareCards = createAction(
  STORE_COMPARE_CARDS,
  (experimentRef, workload, status = false, path = '') => ({
    experimentRef,
    data: { workload },
    status,
    path,
  }),
);
