import types from '../actions/types';

const DEFAULT_STATE = {

}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    // case types.FETCH_NOTES:
    //   return {
    //     ...state
    //   }
    case types.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case types.RESTAURANT_REFRESH: {
      return DEFAULT_STATE
    }

  default:
    return state;
  }

}
