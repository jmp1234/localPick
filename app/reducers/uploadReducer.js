import types from '../actions/types';

const DEFAULT_STATE = {
  currentPage: 0,
  notes: '',
  inputFocused: false
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
        currentPage: 0,
        notes: ''
      };
    case types.UPLOAD_ADD_NOTES:
      return {
        ...state,
        notes: action.payload
      };
    case types.RESTAURANT_UPLOAD_SUCCESS:
      return DEFAULT_STATE;
    case types.UPLOAD_INPUT_FOCUSED:
      return {
        ...state,
        inputFocused: true
      };
    case types.UPLOAD_INPUT_BLURRED:
      return {
        ...state,
        inputFocused: false
      };
    case types.LOG_OUT_SUCCESS:
      return DEFAULT_STATE

  default:
    return state;
  }

}
