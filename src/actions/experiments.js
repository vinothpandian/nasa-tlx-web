import { createAction } from 'redux-actions';

export const CREATE_EXPERIMENT = 'CREATE_EXPERIMENT';
export const CREATE_EXPERIMENT_ASYNC = 'CREATE_EXPERIMENT_ASYNC';

export const STORE_DATA = 'STORE_DATA';
export const STORE_DATA_ASYNC = 'STORE_DATA_ASYNC';

export const createExperiment = createAction(CREATE_EXPERIMENT);
export const createExperimentAsync = createAction(
  CREATE_EXPERIMENT_ASYNC,
  (userID, expID, partID) => ({
    userID,
    expID,
    partID,
  }),
);

export const storeData = createAction(STORE_DATA);
export const storeDataAsync = createAction(STORE_DATA_ASYNC);

export const SYNC_EXP_DATA = 'SYNC_EXP_DATA';
export const syncExpData = createAction(SYNC_EXP_DATA);
