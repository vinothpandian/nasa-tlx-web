import { createAction } from 'redux-actions';

export const CREATE_EXPERIMENT = 'CREATE_EXPERIMENT';
export const CREATE_EXPERIMENT_ASYNC = 'CREATE_EXPERIMENT_ASYNC';

export const STORE_DATA = 'STORE_DATA';
export const STORE_DATA_ASYNC = 'STORE_DATA_ASYNC';

export const createExperiment = createAction(CREATE_EXPERIMENT);
export const createExperimentAsync = createAction(
  CREATE_EXPERIMENT_ASYNC,
  (userID, experimentID, participantID) => ({
    userID,
    experimentID,
    participantID,
  }),
);

export const storeData = createAction(STORE_DATA);
export const storeDataAsync = createAction(STORE_DATA_ASYNC);
