import { put, fork, all } from "redux-saga/effects";
import {watchLogin, watchLogout, watchFetchUser, watchForFirebaseAuth} from './watchers';

export function* stateSagas() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFetchUser),
    fork(watchForFirebaseAuth)
  ]);
}
