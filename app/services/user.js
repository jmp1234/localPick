import {database} from '../../config/firebaseconfig';


export function setUser(uid, uobj) {
  return database.ref('users').child(uid).set(uobj)
}

export function getUser(userId) {
  const snapshot = database.ref('users').child(userId).once('value')
  return snapshot
}

export function addToMainFeed(restaurantId, restaurantObj) {
  database.ref('/restaurants/' + restaurantId).set(restaurantObj);
}

export function setUserRestaurantObj(restaurantId, restaurantObj, userId) {
  database.ref('/users/' + userId + '/restaurants/' + restaurantId).set(restaurantObj);
}

export function findLocalPicks(city) {
  const snapshot = database.ref('restaurants').orderByChild('city').equalTo(city).once('value');
  return snapshot
}

export function fetchNotes(restaurantId) {
  const snapshot = database.ref('notes').child(restaurantId).once('value');
  return snapshot
}

export function addNotes(restaurantId, notesId, notesObj) {
  database.ref(`/notes/${restaurantId}/${notesId}`).set(notesObj)
}

export function deleteUserNote(restaurantId, noteId) {
  database.ref('/notes/' + restaurantId + '/' + noteId).remove()
}
