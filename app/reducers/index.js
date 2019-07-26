import { combineReducers } from "redux";
import currentUser from './userReducer';
import profileReducer from './profileReducer';
import uploadReducer from './uploadReducer';

export default combineReducers({
  currentUser,
  profileReducer,
  uploadReducer
})
