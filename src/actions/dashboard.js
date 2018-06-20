import { createAction } from 'redux-actions';

export const PUSH_TO_DASHBOARD = 'PUSH_TO_DASHBOARD';

export const FETCH_ALL_EXPERIMENTS_ASYNC = 'FETCH_ALL_EXPERIMENTS_ASYNC';
export const FETCH_ALL_PARTICIPANTS_ASYNC = 'FETCH_ALL_PARTICIPANTS_ASYNC';

export const fetchAllExperimentsAsync = createAction(FETCH_ALL_EXPERIMENTS_ASYNC);
export const fetchAllParticipantsAsync = createAction(
  FETCH_ALL_PARTICIPANTS_ASYNC,
  (userID, expID) => ({
    userID,
    expID,
  }),
);
