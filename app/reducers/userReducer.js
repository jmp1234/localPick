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
        user: {
          userId: action.payload
        }
      };
    case types.LOG_OUT:
      return { ...state, auth: false};
  default:
    return state;
  }
}
