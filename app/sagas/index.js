import { put, fork, all } from "redux-saga/effects";
import {watchLogin, watchLogout, watchFetchUser, watchForFirebaseAuth,
  watchSignup, watchSignupSuccess, watchRestaurantUpload, watchFetchLocalPicks,
  watchFetchNotes, watchFetchProfile, watchFindNewAvatar, watchEditProfile, watchAddNewNotes
} from './watchers';

export function* stateSagas() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFetchUser),
    fork(watchForFirebaseAuth),
    fork(watchSignupSuccess),
    fork(watchRestaurantUpload),
    fork(watchFetchLocalPicks),
    fork(watchFetchNotes),
    fork(watchFetchProfile),
    fork(watchFindNewAvatar),
    fork(watchEditProfile),
    fork(watchAddNewNotes),
  ]);
}
