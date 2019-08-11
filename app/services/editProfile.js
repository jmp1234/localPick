import {database} from '../../config/firebaseconfig';

export function deleteUserRestaurantObj(restaurantId, restaurantObj, userId) {
  database.ref('/users/' + userId + '/restaurants/' + restaurantId).remove()
}
