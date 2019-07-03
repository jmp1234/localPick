import types from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
  case types.LOG_IN:
    return { ...state, auth: true, email: action.email };
  default:
    return state;
  }
}
