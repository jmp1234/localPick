import { put, fork, all } from "redux-saga/effects";
import {watchLogin, watchLogout, watchFetchUser} from './watchers';

export function* stateSagas() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFetchUser)
  ]);
}
