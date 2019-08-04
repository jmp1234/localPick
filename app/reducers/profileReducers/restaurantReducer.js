import types from '../../actions/types';

const DEFAULT_STATE = {

}

export default namespace => (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    // case types.FETCH_USER_SUCCESS:
    //   return {
    //
    //     ...state,
    //     ...action.payload.restaurants,
    //   };
    // case types.LOG_OUT_SUCCESS:
    //   return DEFAULT_STATE;
    case types[`${namespace}/FETCH_PROFILE_SUCCESS`]:
      console.log('zzzzzzz', action.payload)
      return {
        ...state,
        ...action.payload.restaurants,
      }


  default:
    return state;
  }

}
