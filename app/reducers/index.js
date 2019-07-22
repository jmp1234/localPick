import { combineReducers } from "redux";
import currentUser from './userReducer';
import userLocalPicks from './profileReducer';

export default combineReducers({
  currentUser,
  userLocalPicks
})
