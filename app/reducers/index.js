import { combineReducers } from "redux";
import currentUser from './userReducer';
import notesReducer from './notesReducer';
import uploadReducer from './uploadReducer';
import cityInputReducer from './searchReducers/cityInputReducer';
import localPicksReducer from './searchReducers/localPicksReducer';
import userProfileInfoReducer from './userProfileReducers/userProfileInfoReducer';
import userRestaurantReducer from './userProfileReducers/userRestaurantReducer';


export default combineReducers({
  currentUser,
  userProfileReducer: combineReducers({
    userProfileInfoReducer,
    userRestaurantReducer,
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
