export const selectUploadReducer = state => state.uploadReducer;

export const selectNotes = state => {
  const uploadReducer = selectUploadReducer(state);
  return uploadReducer.notes
}

export const selectInputFocus = state => {
  const uploadReducer = selectUploadReducer(state);
  return uploadReducer.inputFocused
}

export const selectNotesLength = state => {
  const notes = selectNotes(state);
  return notes.length;
}

export const selectCharactersRemaining = state => {
  const notesLength = selectNotesLength(state);
  return 200 - notesLength
}
