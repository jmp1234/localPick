import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';
import {selectUserId} from './userSelectors';

export const selectNotesReducer = state => state.notesReducer

export const selectNotesAvatar = state => {
  const notesReducer = selectNotesReducer(state);
  return notesReducer.avatar;
}

export const selectNotesUsername = state => {
  const notesReducer = selectNotesReducer(state);
  return notesReducer.userName;
}

export const selectUserNotes = state => {
  const userId = selectUserId(state);
  const notes = selectNotesReducer(state);
  const userNotesKeys = _.keys(notes);
  const filteredArr = userNotesKeys.map(key => {
    return {
      commentId: key,
      note: notes[key].note,
      author: notes[key].author,
    }
  }).filter(note => note.author === userId)
  return filteredArr
}

export const selectNonUserNotes = state => {
  const userId = selectUserId(state);
  const notes = selectNotesReducer(state);
  const userNotesKeys = _.keys(notes);
  const filteredArr = userNotesKeys.map(key => {
    return {
      commentId: key,
      note: notes[key].note,
      author: notes[key].author,
      avatar: notes[key].avatar,
      userName: notes[key].userName
    }
  }).filter(note => note.author !== userId)
  return filteredArr
}
