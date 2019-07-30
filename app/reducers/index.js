import { combineReducers } from "redux";
import currentUser from './userReducer';
import profileReducer from './profileReducer';
import notesReducer from './notesReducer';
import uploadReducer from './uploadReducer';
import cityInputReducer from './searchReducers/cityInputReducer';
import localPicksReducer from './searchReducers/localPicksReducer';


export default combineReducers({
  currentUser,
  profileReducer,
  notesReducer,
  uploadReducer,
  searchReducer: combineReducers({
    cityInputReducer,
    localPicksReducer
  })
})
