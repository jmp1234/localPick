import { put, fork, take, all } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {auth, database} from '../../config/firebaseconfig';
import {fetchUserSuccess, loginSuccess, fetchUserInfo} from '../actions';

export function* startListener(action) {
  // #1: Creates an eventChannel and starts the listener;
  const channel = new eventChannel(emiter => {
    const listener = database
      .ref('users')
      .child(action.payload)
      .on('value', snapshot => {
        emiter({ data: snapshot.val() || {} });
      });

    // #2: Return the shutdown method;
    return () => {
      listener.off();
    };
  });

  // #3: Creates a loops to keep the execution in memory;
  while (true) {
    const { data } = yield take(channel);
    // console.log('--------------------', data)
    // #4: Pause the task until the channel emits a signal and dispatch an action in the store;
    yield put(fetchUserSuccess(data));
  }
}

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
      yield put(loginSuccess(data.user.uid))
      yield put(fetchUserInfo(data.user.uid))
    }
  }
}
