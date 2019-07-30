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
  const arrFiltered = arr.map((restaurant, index) => {
    restaurant.link = `https://maps.googleapis.com/maps/api/place/photo?maxheight=200&photoreference=${restaurant.photoReference}&key=${config.GOOGLE_PLACES_KEY}`;
    restaurant.key = keys[index]
    return restaurant;
  }).sort((first, second) => second.timestamp - first.timestamp)
  return arrFiltered
}
