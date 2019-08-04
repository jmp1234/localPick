import types from '../../actions/types';

const DEFAULT_STATE = {
  userName: null,
  city: null,
  firstName: null,
  lastName: null,
  avatar: null,
  coords: null,
}

export default namespace => (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    // case types.FETCH_USER_SUCCESS:
    case types[`${namespace}/FETCH_PROFILE_SUCCESS`]:
      return {
        ...state,
        avatar: action.payload.avatar,
        city: action.payload.city,
        coords: action.payload.coords,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName
      };
    case types.LOG_OUT_SUCCESS:
      return DEFAULT_STATE;

  default:
    return state;
  }

}
