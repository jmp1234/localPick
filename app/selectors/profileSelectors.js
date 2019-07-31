import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';

export const selectCurrentUser = state => state.profileReducer

export const selectCoords = state => {
  const user = selectCurrentUser(state);
  return user.coords
}

export const selectUserRestaurants = (state) => {
  const user = selectCurrentUser(state);
  return user.restaurants
}

export const selectAvatar = state => {
  const user = selectCurrentUser(state);
  return user.avatar
}

export const selectUserName = (state) => {
  const user = selectCurrentUser(state);
  return user.userName
}

export const selectUserRestaurantsArray= state => {
  const restaurantNames = selectUserRestaurants(state);
  const arr = _.values(restaurantNames);
  const keys = _.keys(restaurantNames)
  const arrFiltered = arr.map((restaurant, index) => {
    restaurant.link = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${restaurant.photoReference}&key=${config.GOOGLE_PLACES_KEY}`;
    restaurant.key = keys[index]
    return restaurant;
  }).sort((first, second) => second.timestamp - first.timestamp)
  return arrFiltered
}
