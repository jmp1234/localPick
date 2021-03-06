import types from '../../actions/types';

const DEFAULT_STATE = [];

export default namespace => (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types[`${namespace}/FETCH_PROFILE_SUCCESS`]:
      return [
        ...state,
        {...action.payload.restaurants}
      ]
    case types[`${namespace}/PROFILE_GO_BACK`]:
      return state.filter((restaurant, index) => index !== state.length-1)
    case types[`${namespace}/CLEAR_PROFILES`]:
      return DEFAULT_STATE;
  default:
    return state;
  }

}
