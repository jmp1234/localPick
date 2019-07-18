import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import types from '../actions/types';
import {onLogin, onLogout} from './workers'

export function* watchLogin() {
  yield takeEvery(types.LOG_IN, onLogin)
}

export function* watchLogout() {
  yield takeEvery(types.LOG_OUT, onLogout)
}
