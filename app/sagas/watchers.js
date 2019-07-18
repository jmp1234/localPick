import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import types from '../actions/types';
import {onLogin} from './workers'

export function* watchLogin() {
  yield takeEvery(types.LOG_IN, onLogin)
}
