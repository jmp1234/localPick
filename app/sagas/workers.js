import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {auth} from '../../config/firebaseconfig';
import {loginSuccess, loginFailure, logoutSuccess, logoutFailure} from '../actions';
import * as NavigationService from '../services/navigation/navigationService';
import {Alert} from 'react-native';

export function* onLogin(action) {
  const {email, password} = action.payload
    try {
      const user = yield call(
       [auth, auth.signInWithEmailAndPassword],
       email,
       password
     )
      yield put(loginSuccess(user.user.uid));
      NavigationService.goBack()
    } catch (err) {
        yield put(loginFailure(err.message));
        yield call(Alert.alert, 'Login Error', err.message )
    }
}

export function* onLogout(action) {
  try {
    yield call([auth, auth.signOut]);
    yield put(logoutSuccess());
    NavigationService.navigate('UserAuth');
  } catch(err) {
    yield put(logoutFailure(err.message));
    yield call(Alert.alert, 'Logout Error', err.message )
  }
}
