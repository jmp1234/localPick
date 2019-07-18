import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {auth} from '../../config/firebaseconfig';
import {loginSuccess} from '../actions';
import * as NavigationService from '../services/navigation/navigationService';

export function* onLogin(action) {
  const {email, password} = action.payload
  console.log('sagas: ', email, password)
    try {
      const user = yield call(
       [auth, auth.signInWithEmailAndPassword],
       email,
       password
     )
     console.log('user: ', user.user.uid)
      yield put(loginSuccess(user.user.uid));
      NavigationService.goBack()
    } catch (err) {
        console.error("onLogin", err);
        // yield put(actionLoginFailure());
    }
}
