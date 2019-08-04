import types from '../../actions/types';


const DEFAULT_STATE = []

export default namespace => (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types[`${namespace}/FETCH_PROFILE_SUCCESS`]:
      return [
        ...state, {
        avatar: action.payload.avatar,
        city: action.payload.city,
        coords: action.payload.coords,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName
      }];
    case types[`${namespace}/PROFILE_GO_BACK`]:
      // return [
      //   ...state,
      //   state.filter((profile, index) => index !== state.length-1)
      // ];
      return state.filter((profile, index) => index !== state.length-1)
    case types.LOG_OUT_SUCCESS:
      return DEFAULT_STATE;

  default:
    return state;
  }

}
