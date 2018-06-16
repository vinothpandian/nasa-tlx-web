import { all } from 'redux-saga/effects';
import watchExperimentActions from './experiments';

export default function* rootSaga() {
  yield all([watchExperimentActions()]);
}
