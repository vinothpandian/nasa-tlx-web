/* eslint import/no-extraneous-dependencies: off */
import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import saga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(reducers, applyMiddleware(middleware, sagaMiddleware));

sagaMiddleware.run(saga);
