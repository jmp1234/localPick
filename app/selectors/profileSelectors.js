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

// userName, city, firstName, lastName, avatar

export const selectCurrentProfileObj = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  return currentProfileInfoArr[currentProfileInfoArr.length-1]
}

export const selectCurrentProfileUsername = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  if(currentProfileInfoArr[currentProfileInfoArr.length-1] ) {
    return currentProfileInfoArr[currentProfileInfoArr.length-1].userName
  } else {
    return ''
  }
}

export const selectCurrentProfileCity = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  if(currentProfileInfoArr[currentProfileInfoArr.length-1] ) {
    return currentProfileInfoArr[currentProfileInfoArr.length-1].city
  } else {
    return ''
  }
}

export const selectCurrentProfileFirstname = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  if(currentProfileInfoArr[currentProfileInfoArr.length-1] ) {
    return currentProfileInfoArr[currentProfileInfoArr.length-1].firstName
  } else {
    return ''
  }
}

export const selectCurrentProfileLastname = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  if(currentProfileInfoArr[currentProfileInfoArr.length-1] ) {
    return currentProfileInfoArr[currentProfileInfoArr.length-1].lastName
  } else {
    return ''
  }
}

export const selectCurrentProfileAvatar = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const currentProfileInfo = selectCurrentProfileInfo(state);
  const currentProfileInfoArr =  currentProfileInfo[namespace];
  if(currentProfileInfoArr[currentProfileInfoArr.length-1] ) {
    return currentProfileInfoArr[currentProfileInfoArr.length-1].avatar
  } else {
    return ''
  }
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
