import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';

export const selectSearchReducer = state => state.searchReducer;

export const selectCityInputReducer = state => {
  const searchReducer = selectSearchReducer(state);
  return searchReducer.cityInputReducer;
}

export const selectCity = state => {
  const cityInputReducer = selectCityInputReducer(state);
  return cityInputReducer.city
}

export const selectLocalPicks = state => {
  const searchReducer = selectSearchReducer(state);
  return searchReducer.localPicksReducer
}

export const selectLocalPicksArray= state => {
  const localPicks = selectLocalPicks(state);
  const arr = _.values(localPicks);
  const keys = _.keys(localPicks)
  const keysFiltered = keys.map((restaurant, index) => {
    return {
      key: restaurant,
      link: `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${localPicks[restaurant].photoReference}&key=${config.GOOGLE_PLACES_KEY}`,
      timestamp: localPicks[restaurant].timestamp,
      name: localPicks[restaurant].name
    };
  }).sort((first, second) => second.timestamp - first.timestamp)
  return keysFiltered
}
