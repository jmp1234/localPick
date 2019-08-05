import types from '../actions/types';

const DEFAULT_STATE = {
  url: '',
  firstName: '',
  lastName: '',
  userName: '',
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.FIND_NEW_AVATAR_SUCCESS:
      return {
        ...state,
        url: action.payload.url
      };
    case types.EDIT_FIRSTNAME:
      return {
        ...state,
        firstName: action.payload.text
      }
    case types.EDIT_LASTNAME:
      return {
        ...state,
        lastName: action.payload.text
      }
    case types.EDIT_USERNAME:
      return {
        ...state,
        userName: action.payload.text
      }

  default:
    return state;
  }

}
