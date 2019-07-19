import { all, call, fork, put, takeEvery, take } from "redux-saga/effects";
import types from '../actions/types';
import {onLogin, onLogout} from './workers';
import {getAuthChannel, startListener} from './eventChannelSaga';

export function* watchLogin() {
  yield takeEvery(types.LOG_IN, onLogin)
}

export function* watchLogout() {
  yield takeEvery(types.LOG_OUT, onLogout)
}

export function* watchFetchUser() {
  yield takeEvery(types.FETCH_USER_PROFILE, startListener)
}


export function* watchForFirebaseAuth() {
  // This is where you wait for a callback from firebase
  const channel = yield call(getAuthChannel);
  const result = yield take(channel);
  // result is what you pass to the emit function.
}
