import { all, call, fork, put, takeEvery, eventChannel } from "redux-saga/effects";
import {auth, database} from '../../config/firebaseconfig';
import {loginSuccess, loginFailure, logoutSuccess, logoutFailure, signupSuccess, signupFailure, fetchUserInfo, fetchUserSuccess, restaurantUploadSuccess} from '../actions';
import * as NavigationService from '../services/navigation/navigationService';
import {Alert} from 'react-native';
import {setUser, getUser, addToMainFeed, setUserRestaurantObj} from '../services/user';
import config from '../../config/config';

export function* onLogin(action) {
  const {email, password} = action.payload
    try {
      const user = yield call(
       [auth, auth.signInWithEmailAndPassword],
       email,
       password
     )

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

export function* onSignup(action) {

  try {
    const {email, password, firstName, lastName, userName, coords, city} = action.payload;
    const user = yield call(
     [auth, auth.createUserWithEmailAndPassword],
     email,
     password
   )
    yield put(signupSuccess(user.user.uid, firstName, lastName, userName, coords, city, email));
  } catch(err) {
    yield put(signupFailure(err.message))
    yield call(Alert.alert, 'Signup Error', err.message )
  }
}

export function* onFetchUser(action) {
  try {
    const snapshot = yield call(getUser, action.payload);
    yield put(fetchUserSuccess(snapshot.val()))
  } catch(err) {
    Alert.alert('Error fetching user information')
  }
}

export function* onSignupSuccess(action) {
  const {user, firstName, lastName, userName, coords, city, email} = action.payload;
  const uObj = {
    firstName, lastName, userName, email, coords, city,
    avatar: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png'
  }

  try{
    yield call(setUser, user, uObj);

  } catch(err) {
    Alert.alert('error')
  }
}
export function* onRestaurantUpload(action) {
  const {restaurantId, address, name, website, user, notes, photoReference} = action.payload
  const restaurantObj = {address, name, website, user, notes, photoReference}
  const photosLink = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${photoReference}&key=${config.GOOGLE_PLACES_KEY}`;

  try{
    //add data to firebase
    yield call(addToMainFeed, restaurantId, restaurantObj);
    yield call(setUserRestaurantObj, restaurantId, restaurantObj, user);
    //update state
    yield put(restaurantUploadSuccess(address, name, website, user, notes, restaurantId, photoReference))
    NavigationService.navigate('Profile');
  } catch(err){
    Alert.alert('Error uploading restaurant: ', err.message)
  }
}
