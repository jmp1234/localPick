import types from '../actions/types';

const DEFAULT_STATE = {
  overlayVisible: false,
  note: '',
  focusedCommentId: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.OPEN_OVERLAY:
      return {
        ...state,
        overlayVisible: true
      };
    case types.CLOSE_OVERLAY:
      return {
        ...state,
        overlayVisible: false,
        note: ''
      }
    case types.EDIT_NOTE:
      return {
        ...state,
        note: action.payload.text
      }
    case types.USER_NOTE_PRESSED:
      return {
        ...state,
        focusedCommentId: action.payload.commentId
      }
    case types.USER_NOTE_CLOSED:
      return {
        ...state,
        focusedCommentId: ''
      }
  default:
    return state;
  }

}
