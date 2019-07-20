import { put, fork, take, all } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {auth, database} from '../../config/firebaseconfig';
import {fetchUserSuccess, loginSuccess, fetchUserInfo} from '../actions';
import * as NavigationService from '../services/navigation/navigationService';


export function* getAuthChannel() {

  const channel = new eventChannel(emiter => {
    const listener = auth.onAuthStateChanged(user => {
      return emiter( {user} )
    })

    return () => {
      listener.off();
    };
  });

  while (true) {
    const  data  = yield take(channel);
    if(data.user) {
      yield put(fetchUserInfo(data.user.uid))
      yield put(loginSuccess(data.user.uid))
      NavigationService.goBack()
    }
  }
}
