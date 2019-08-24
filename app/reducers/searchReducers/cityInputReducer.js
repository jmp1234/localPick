import types from '../../actions/types';

const DEFAULT_STATE = {
  page: 0,
  city: '',
  hideIcon: false
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case types.HIDE_ICON:
      return {
        ...state,
        hideIcon: true
      };
    case types.DISPLAY_ICON:
      return {
        ...state,
        hideIcon: false
      }    
    case types.SEARCH_NEXT_PAGE:
      return {
        ...state,
        page: 1
      };
    case types.SEARCH_MOVE_BACK:
      return {
        ...state,
        page: 0
      };
    case types.FETCH_LOCAL_PICKS:
      return {
        ...state,
        city: action.payload
      }

  default:
    return state;
  }

}
