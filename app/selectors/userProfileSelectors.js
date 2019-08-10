import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';

export const selectCurrentUser = state => state.userProfileReducer.userProfileInfoReducer

export const selectCoords = state => {
  const user = selectCurrentUser(state);
  return user.coords
}


export const selectUserRestaurants = state => state.userProfileReducer.userRestaurantReducer;


export const selectAvatar = state => {
  const user = selectCurrentUser(state);
  return user.avatar
}

export const selectUserName = (state) => {
  const user = selectCurrentUser(state);
  return user.userName
}

export const selectFirstName = (state) => {
  const user = selectCurrentUser(state);
  return user.firstName
}

export const selectLastName = (state) => {
  const user = selectCurrentUser(state);
  return user.lastName
}

export const selectCity = (state) => {
  const user = selectCurrentUser(state);
  return user.city
}


export const selectUserPhotosArray= state => {
  const restaurantNames = selectUserRestaurants(state);
  const keys = _.keys(restaurantNames)
  const keysFiltered = keys.map((restaurantId, index) => {
    return {
      key: restaurantId,
      link: `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${restaurantNames[restaurantId].photoReference}&key=${config.GOOGLE_PLACES_KEY}`,
      timestamp: restaurantNames[restaurantId].timestamp,
      name: restaurantNames[restaurantId].name
    }
  }).sort((first, second) => second.timestamp - first.timestamp)
  return keysFiltered
}
