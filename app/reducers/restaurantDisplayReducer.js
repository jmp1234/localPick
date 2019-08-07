import types from '../actions/types';

const DEFAULT_STATE = {
  overlayVisible: false,
  note: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.OPEN_OVERLAY:
      return {
        ...state,
        overlayVisible: true
      };
    case types.CLOSE_OVERLAY:
      return DEFAULT_STATE;
    case types.EDIT_NOTE:
      return {
        ...state,
        note: action.payload.text
      }
  default:
    return state;
  }

}
