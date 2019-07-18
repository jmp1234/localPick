import { put, fork, all } from "redux-saga/effects";
import {watchLogin} from './watchers'

export function* stateSagas() {
  yield all([
    fork(watchLogin)
  ]);
}
