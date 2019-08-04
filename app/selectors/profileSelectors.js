import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';
import { selectCurrentUser } from './userProfileSelectors';

export const selectCurrentProfile = state => state.profileReducers;

export const selectCurrentProfileInfo = state => {
  const currentProfile = selectCurrentProfile(state);
  return currentProfile.profileInfoReducers
}

export const selectCurrentProfileRestaurantsReducer = state => {
  const currentProfile = selectCurrentProfile(state);
  return currentProfile.restaurantReducers
}

export const arrayLength = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params;
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  return currentProfileInfoArr.length
}

export const selectCurrentProfileObj = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  return currentProfileInfoArr[currentProfileInfoArr.length-1]
}

export const selectCurrentProfileRestaurants = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params;
  const currentProfileRestaurants = selectCurrentProfileRestaurantsReducer(state);
  const currentProfileRestaurantsArr = currentProfileRestaurants[namespace];
  return currentProfileRestaurantsArr[currentProfileRestaurantsArr.length-1]
}

export const selectProfilePhotosArray = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params;
  const restaurantsArr = selectCurrentProfileRestaurantsReducer(state)[namespace];
  const restaurantNames = restaurantsArr[restaurantsArr.length-1]
  const keys = _.keys(restaurantNames);

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
