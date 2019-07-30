import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';
import {selectUserId} from './userSelectors';

export const selectNotesReducer = state => state.notesReducer

export const selectUserNotes = state => {
  const userId = selectUserId(state);
  const notes = selectNotesReducer(state);
  const userNotesKeys = _.keys(notes);
  const filteredArr = userNotesKeys.map(key => {
    return {
      commentId: key,
      note: notes[key].note,
      author: notes[key].author
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
      author: notes[key].author
    }
  }).filter(note => note.author !== userId)
  return filteredArr
}
