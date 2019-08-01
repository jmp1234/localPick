import { combineReducers } from "redux";
import currentUser from './userReducer';
import profileReducer from './profileReducer';
import notesReducer from './notesReducer';
import uploadReducer from './uploadReducer';
import cityInputReducer from './searchReducers/cityInputReducer';
import localPicksReducer from './searchReducers/localPicksReducer';
import profileInfoReducer from './profileReducers/profileInfoReducer';
import restaurantReducer from './profileReducers/restaurantReducer';


export default combineReducers({
  currentUser,
  profileReducer,
  profileReducer: combineReducers({
    profileInfoReducer,
    restaurantReducer,
  }),
  notesReducer,
  uploadReducer,
  searchReducer: combineReducers({
    cityInputReducer,
    localPicksReducer
  })
})
