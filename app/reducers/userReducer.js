import types from '../actions/types';


const DEFAULT_STATE = {
  user: null,
  pendingLogin: false,
  pendingLogout: false,
  userError: null,
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.LOG_IN:
      return {
        ...state,
        pendingLogin: true
      };
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        pendingLogin: false,
        userError: null,
        user: {
          userId: action.payload
        }
      };
    case types.LOG_IN_ERROR:
      return {
        ...state,
        pendingLogin: false,
        userError: action.payload
      };
    case types.LOG_OUT:
      return {
        ...state,
        pendingLogout: true,
      };
    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        pendingLogout: false,
      };
    case types.LOG_OUT_ERROR:
      return {
        ...state,
        pendingLogout: false,
      };
  default:
    return state;
  }
}
