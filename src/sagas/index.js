import { all } from 'redux-saga/effects';
import watchExperimentActions from './experiments';
import watchStateActions from './state';
import watchDashboardActions from './dashboard';

export default function* rootSaga() {
  yield all([watchExperimentActions(), watchStateActions(), watchDashboardActions()]);
}
