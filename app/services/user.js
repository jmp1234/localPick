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

export function setUserRestaurantObj(restaurantId, restaurantObj) {
  database.ref('/users/' + userId + '/restaurants/' + restaurantId).set(restaurantObj);
}
