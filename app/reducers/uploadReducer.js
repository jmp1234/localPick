import types from '../actions/types';

const DEFAULT_STATE = {
  currentPage: 0,
  notes: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.UPLOAD_NEXT_PAGE:
      return {
        ...state,
        currentPage: 1
      };
    case types.UPLOAD_MOVE_BACK:
      return {
        ...state,
        currentPage: 0
      };
    case types.UPLOAD_ADD_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case types.RESTAURANT_UPLOAD_SUCCESS:
      return {
        ...state,
        ...DEFAULT_STATE
      }

  default:
    return state;
  }

}
