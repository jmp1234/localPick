import types from '../actions/types';

const DEFAULT_STATE = {
  page: 0,
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
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
  default:
    return state;
  }

}
