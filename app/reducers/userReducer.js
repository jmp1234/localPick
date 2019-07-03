import types from '../actions/types';

const DEFAULT_STATE = {auth: false, email: ''}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.LOG_IN:
      return { ...state, auth: true};
    case types.LOG_OUT:
      return { ...state, auth: false};
  default:
    return state;
  }
}
