/* eslint import/no-extraneous-dependencies: off */
import 'regenerator-runtime/runtime';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const history = createHistory();
const middleware = routerMiddleware(history);

// To enable Redux devtools during development
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(middleware, sagaMiddleware)),
);

sagaMiddleware.run(saga);
