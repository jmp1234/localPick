import { put, fork, all } from "redux-saga/effects";
import {watchLogin, watchLogout, watchFetchUser, watchForFirebaseAuth, watchSignup, watchSignupSuccess, watchRestaurantUpload} from './watchers';

export function* stateSagas() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFetchUser),
    fork(watchForFirebaseAuth),
    fork(watchSignupSuccess),
    fork(watchRestaurantUpload),
  ]);
}
