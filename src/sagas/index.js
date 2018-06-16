import { all } from 'redux-saga/effects';
import watchCreateExperimentAsync from './experiments';

export default function* rootSaga() {
  yield all([watchCreateExperimentAsync()]);
}
