import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';

export const selectCurrentUser = state => state.profileReducer

export const selectUserRestaurants = (state) => {
  const user = selectCurrentUser(state);
  return user.restaurants
}

export const selectUserRestaurantsArray= state => {
  const restaurantNames = selectUserRestaurants(state);
  const arr = _.values(restaurantNames);
  const arrFiltered = arr.map(restaurant => {
    restaurant.link = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${restaurant.photoReference}&key=${config.GOOGLE_PLACES_KEY}`;
    return restaurant;
  })
  return arrFiltered
}
