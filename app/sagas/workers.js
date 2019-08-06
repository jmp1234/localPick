import { all, call, fork, put, takeEvery, eventChannel } from "redux-saga/effects";
import {auth, database} from '../../config/firebaseconfig';
import {loginSuccess, loginFailure, logoutSuccess, logoutFailure,
  signupSuccess, signupFailure, fetchUserInfo, fetchUserSuccess,
  restaurantUploadSuccess, fetchLocalPicksSuccess, fetchNotesSuccess,
  fetchProfileSuccess, findNewAvatarSuccess, restaurantRefresh
} from '../actions';
import * as NavigationService from '../services/navigation/navigationService';
import {Alert} from 'react-native';
import {setUser, getUser, addToMainFeed,
  setUserRestaurantObj, findLocalPicks, fetchNotes, addNotes} from '../services/user';
import { awaitStatus, awaitStatusRoll, awaitImagePicker,
  getResponse, getBlob, uploadTask, getUrl, saveImageToDatabase,
  saveFirstnameToDatabase, saveLastnameToDatabase, saveUsernameToDatabase
} from '../services/uploadAvatar';
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
    avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  }

  try{
    yield call(setUser, user, uObj);

  } catch(err) {
    Alert.alert('error')
  }
}

// export function *onAddNotes(restaurantId, notesId, author, note, posted, userName, avatar) {
export function *onAddNotes(action) {
  console.log('action!!!: ', action)
  const {restaurantId, notesId, userId, note, posted, userName, avatar} = action.payload
  const notesObj = {author: userId, avatar, note, posted, userName};
  yield call(addNotes, restaurantId, notesId, notesObj)

  // yield put(restaurantRefresh('instance1'))
  // yield put(fetchNotesSuccess(action.payload.namespace, snapshot.val()))
    // yield put(fetchNotesSuccess('instance1', {[notesId]: notesObj}))
    yield call(onFetchNotes, action)

}

export function* onRestaurantUpload(action) {
  const {restaurantId, address, name, website, user, notes, photoReference,
    timestamp, city, notesId, userName, avatar} = action.payload
  const restaurantObj = {address, name, website, user, notes, photoReference, timestamp, city}
  const photosLink = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${photoReference}&key=${config.GOOGLE_PLACES_KEY}`;

  try{
    //add data to firebase
    yield call(addToMainFeed, restaurantId, restaurantObj);
    yield call(setUserRestaurantObj, restaurantId, restaurantObj, user);

    yield call(onAddNotes, restaurantId, notesId, user, notes, timestamp, userName, avatar)


    //update state
    yield put(restaurantUploadSuccess(address, name, website, user, notes, restaurantId, photoReference, timestamp));

    //navigate to profile page if successful upload
    NavigationService.goBack();
    NavigationService.navigate('Profile');
  } catch(err){
    Alert.alert('Error uploading restaurant: ', err.message)
  }
}

export function* onFetchLocalPicks(action) {
  try {
    const snapshot = yield call(findLocalPicks, action.payload);
    yield put (fetchLocalPicksSuccess(snapshot.val()))
    NavigationService.navigate('LocalPicks');
  } catch(err) {
    Alert.alert('Error finding local picks', err)
  }
}

export function* onFetchNotes(action) {
  try{
    // NavigationService.navigate('RestaurantDisplay', {...action.payload.restaurantObj, link: action.payload.link})
    //make a call to the database
    const snapshot = yield call(fetchNotes, action.payload.restaurantId, action.payload.userId);
    console.log('fuck: ', snapshot.val())
    yield put(fetchNotesSuccess(action.payload.namespace, snapshot.val()))

  } catch(err) {
    Alert.alert('Error accessing notes', err)
    console.log('error accessing notes: ', err)
  }
}

export function* onFetchProfile(action) {
  const {userId, namespace, navigation} = action.payload
  console.log('under: ', navigation)
  try {
    const snapshot = yield call(getUser, userId);
    yield put(fetchProfileSuccess(snapshot.val(), namespace))
    navigation.push('ProfileContainer', {namespace})
  } catch(err) {
    console.log('error! ', err)
    Alert.alert('error! ', err)
  }
}

export function* onFindNewAvatar(action) {
  try {
    //check permissions
    const status = yield call(awaitStatus);
    const statusRoll = yield call(awaitStatusRoll)

    //get result
    const result = yield call(awaitImagePicker)
    if(!result.cancelled) {
      yield call(onUploadImage, action, result.uri)
    }
  } catch (err) {
    Alert.alert('error: ', err)
  }
}

export function* onUploadImage(action, uri) {
  const { userId, imageId } = action.payload
  const re = /(?:\.([^.]+))?$/;
  const ext = re.exec(uri)[1];
  const FilePath = imageId + '.' + ext;

  try{
    const response = yield call(getResponse, uri)
    const blob = yield call(getBlob, response)
    const result = yield call(uploadTask, userId, FilePath, blob)
    const url = yield call(getUrl, result)

    yield put(findNewAvatarSuccess(url))

  } catch(err) {
    Alert.alert('error with upload: ', err);
    console.log('error with upload: ', err);
  }
}

export function* onEditProfile(action) {
  const {link, userId, firstname, lastname, username} = action.payload

  try{
      yield call(saveImageToDatabase, link, userId);
      yield call(saveFirstnameToDatabase, firstname, userId)
      yield call(saveLastnameToDatabase, lastname, userId)
      yield call(saveUsernameToDatabase, username, userId)

      yield put(fetchUserInfo(userId))
      NavigationService.goBack();
  } catch(err) {
    Alert.alert('error editing profile: ', err)
    console.log('error editing profile: ', err)
  }
}
