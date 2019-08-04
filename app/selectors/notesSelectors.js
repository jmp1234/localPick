import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';
import {selectUserId} from './userSelectors';

export const selectNotesReducer = (state, ownProps) => {
  return state.notesReducers
}


export const selectUserNotes = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const userId = selectUserId(state);
  const notes = selectNotesReducer(state)[namespace];
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

export const selectNonUserNotes = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const userId = selectUserId(state);
  const notes = selectNotesReducer(state)[namespace];
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
