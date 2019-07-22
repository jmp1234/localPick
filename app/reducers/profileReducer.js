import types from '../actions/types';

const DEFAULT_STATE = {
  userName: null,
  city: null,
  firstName: null,
  lastName: null,
  avatar: null,
  coords: null,
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.LOG_IN:
      return {
        ...state,
        pendingLogin: true
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
          userName: null,
          city: null,
          firstName: null,
          lastName: null,
          avatar: null,
          coords: null,
      };

  default:
    return state;
  }

}
