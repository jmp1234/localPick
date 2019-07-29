export const selectNotes = state => state.uploadReducer.notes;

export const selectNotesLength = state => {
  const notes = selectNotes(state);
  return notes.length;
}

export const selectCharactersRemaining = state => {
  const notesLength = selectNotesLength(state);
  return 80 - notesLength 
}
