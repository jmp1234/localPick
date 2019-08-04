import types from '../actions/types';

const DEFAULT_STATE = {

}

export default namespace => (state = DEFAULT_STATE, action) => {
  switch(action.type) {

    case types[`${namespace}/FETCH_NOTES_SUCCESS`]:
      return {
        ...state,
        ...action.payload,
      };
    case types[`${namespace}/RESTAURANT_REFRESH`]:
      return DEFAULT_STATE

    default:
      return state;
    }

}
