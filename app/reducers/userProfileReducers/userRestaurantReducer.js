import types from '../../actions/types';

const DEFAULT_STATE = {

}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.payload.restaurants,
      };
    case types.LOG_OUT_SUCCESS:
      return DEFAULT_STATE;
    // case types.RESTAURANT_UPLOAD:
    //   return {
    //     ...state
    //   }
    case types.RESTAURANT_UPLOAD_SUCCESS:
      return {
        ...state,
        // restaurants: {
          // ...state.restaurants,
          [action.payload.restaurantId]: {
            ...state[action.payload.restaurantId],
            address: action.payload.address,
            name: action.payload.name,
            website: action.payload.website,
            user: action.payload.user,
            notes: action.payload.notes,
            photoReference: action.payload.photoReference,
            timestamp: action.payload.timestamp
          }
        // }
      }
    // case types.RESTAURANT_UPLOAD_ERROR:
    //   return {
    //     ...state
    //   }

  default:
    return state;
  }

}
