import types from '../actions/types';


const DEFAULT_STATE = [];

export default namespace => (state = DEFAULT_STATE, action) => {
  switch(action.type) {

    case types[`${namespace}/FETCH_NOTES_SUCCESS`]:
      return [
        ...state, {
          ...action.payload
        }
      ]
    case types[`${namespace}/RESTAURANT_REFRESH`]:
      return state.filter((notes, index) => index !== state.length-1)

    case types[`${namespace}/CLEAR_PROFILES`]:
      return DEFAULT_STATE;

    default:
      return state;
    }

}
