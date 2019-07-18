import { put, fork, all } from "redux-saga/effects";
import {watchLogin, watchLogout} from './watchers'

export function* stateSagas() {
  yield all([
    fork(watchLogin),
    fork(watchLogout)
  ]);
}
