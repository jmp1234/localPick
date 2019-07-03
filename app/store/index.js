import {createStore, applyMiddleware} from 'redux';
// import {createStore} from 'redux';
import logger from "redux-logger";
import reducer from '../reducers';

const initialState = {}
const store = createStore(reducer, applyMiddleware(logger))

export default store;
