import { combineReducers } from "redux";
import currentUser from './userReducer';
import profileReducer from './profileReducer';
import uploadReducer from './uploadReducer';
import searchReducer from './searchReducer'

export default combineReducers({
  currentUser,
  profileReducer,
  uploadReducer,
  searchReducer
})
