import { combineReducers } from "redux";
import currentUser from './userReducer';
import notesReducer from './notesReducer';
import uploadReducer from './uploadReducer';
import cityInputReducer from './searchReducers/cityInputReducer';
import localPicksReducer from './searchReducers/localPicksReducer';
import userProfileInfoReducer from './userProfileReducers/userProfileInfoReducer';
import userRestaurantReducer from './userProfileReducers/userRestaurantReducer';
import profileInfoReducer from './profileReducers/profileInfoReducer';
import restaurantReducer from './profileReducers/restaurantReducer';


export default combineReducers({
  currentUser,
  userProfileReducer: combineReducers({
    userProfileInfoReducer,
    userRestaurantReducer,
  }),
  profileReducers: combineReducers({
    profileInfoReducers: combineReducers({
      instance1: profileInfoReducer('instance1'),
      instance2: profileInfoReducer('instance2'),
    }),
    restaurantReducers: combineReducers({
      instance1: restaurantReducer('instance1'),
      instance2: restaurantReducer('instance2'),
    })
  }),
  notesReducers: combineReducers({
    instance1: notesReducer('instance1'),
    instance2: notesReducer('instance2'),
  }),
  uploadReducer,
  searchReducer: combineReducers({
    cityInputReducer,
    localPicksReducer
  })
})
