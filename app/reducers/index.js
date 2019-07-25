import { combineReducers } from "redux";
import currentUser from './userReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  currentUser,
  profileReducer
})
