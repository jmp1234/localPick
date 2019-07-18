import {createStore, applyMiddleware} from 'redux';
import logger from "redux-logger";
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {stateSagas} from '../sagas'

const sagaMiddleware = createSagaMiddleware();

const initialState = {}
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))

sagaMiddleware.run(stateSagas);

export default store;
