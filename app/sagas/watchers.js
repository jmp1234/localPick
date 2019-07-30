import { all, call, fork, put, takeEvery, take } from "redux-saga/effects";
import types from '../actions/types';
import {onLogin, onLogout, onSignup, onSignupSuccess, onFetchUser,
  onRestaurantUpload, onFetchLocalPicks, onFetchNotes
} from './workers';
import {getAuthChannel} from './eventChannelSaga';

export function* watchLogin() {
  yield takeEvery(types.LOG_IN, onLogin)
}

export function* watchLogout() {
  yield takeEvery(types.LOG_OUT, onLogout)
}

export function* watchSignup() {
  yield takeEvery(types.SIGN_UP, onSignup)
}

export function* watchSignupSuccess() {
  yield takeEvery(types.SIGN_UP_SUCCESS, onSignupSuccess)
}


export function* watchFetchUser() {
  yield takeEvery(types.FETCH_USER_PROFILE, onFetchUser)
}


export function* watchForFirebaseAuth() {
  // This is where you wait for a callback from firebase
  const channel = yield call(getAuthChannel);
  const result = yield take(channel);
  // result is what you pass to the emit function.
}

export function* watchRestaurantUpload() {
  yield takeEvery(types.RESTAURANT_UPLOAD, onRestaurantUpload)
}

export function* watchFetchLocalPicks() {
  yield takeEvery(types.FETCH_LOCAL_PICKS, onFetchLocalPicks)
}

export function* watchFetchNotes() {
  yield takeEvery(types.FETCH_NOTES, onFetchNotes)
}
