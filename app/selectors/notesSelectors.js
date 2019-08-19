import { createSelector } from 'reselect';
import  _ from 'lodash';
import config from '../../config/config';
import {selectUserId} from './userSelectors';

export const selectNotesReducer = (state, ownProps) => {
  return state.notesReducers
}

export const selectUserNotesIds = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const notesArr = selectNotesReducer(state)[namespace]
  const notes = notesArr[notesArr.length-1]
  const userNotesKeys = _.keys(notes);
  return userNotesKeys
}


export const selectUserNotes = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const userId = selectUserId(state);
  const notesArr = selectNotesReducer(state)[namespace]
  const notes = notesArr[notesArr.length-1]
  const userNotesKeys = _.keys(notes);
  const filteredArr = userNotesKeys.map(key => {
    return {
      commentId: key,
      note: notes[key].note,
      author: notes[key].author,
      posted: notes[key].posted
    }
  }).filter(note => note.author === userId).sort((a,b) => b.posted - a.posted)
  return filteredArr
}

export const selectNonUserNotes = (state, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
  const userId = selectUserId(state);
  const notesArr = selectNotesReducer(state)[namespace]
  const notes = notesArr[notesArr.length-1]
  const userNotesKeys = _.keys(notes);
  const filteredArr = userNotesKeys.map(key => {
    return {
      commentId: key,
      note: notes[key].note,
      author: notes[key].author,
      avatar: notes[key].avatar,
      userName: notes[key].userName,
      posted: notes[key].posted
    }
  }).filter(note => note.author !== userId).sort((a,b) => b.posted - a.posted)
  return filteredArr
}
