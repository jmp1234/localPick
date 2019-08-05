import types from '../actions/types';

const DEFAULT_STATE = {
  url: '',
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.FIND_NEW_AVATAR_SUCCESS:
      return {
        ...state,
        url: action.payload.url
      };

  default:
    return state;
  }

}
