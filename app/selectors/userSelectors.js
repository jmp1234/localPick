import { createSelector } from 'reselect';

export const selectUserState = state => state.currentUser

export const selectUserId = state => {
  const userState = selectUserState(state);
  return userState.user
}
