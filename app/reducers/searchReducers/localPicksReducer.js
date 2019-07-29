import types from '../../actions/types';

const DEFAULT_STATE = {

}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {

    case types.FETCH_LOCAL_PICKS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }

    case types.LOCAL_PICKS_REFRESH:
      return DEFAULT_STATE
  default:
    return state;
  }

}
