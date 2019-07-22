import { createSelector } from 'reselect';
import  _ from 'lodash';

export const selectCurrentUser = state => state.profileReducer

export const selectUserRestaurants = (state) => {
  const user = selectCurrentUser(state);
  return user.restaurants
}

// export const selectRestaurantNames = state => {
//   const restaurantNames = selectUserRestaurants(state);
//   const arr = _.values(restaurantNames);
//   return arr.map(restaurant => restaurant.name)
// }

export const selectRestaurantNames = state => {
  const restaurantNames = selectUserRestaurants(state);
  const arr = _.values(restaurantNames);
  const keys = _.keys(restaurantNames);
  return arr
}
