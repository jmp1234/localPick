import { NoteOverlayDisplay } from './noteOverlayDisplay';
import { connect } from 'react-redux';
import { selectUserId } from '../../selectors/userSelectors';
import { selectUserName, selectAvatar } from '../../selectors/userProfileSelectors';
import { closeOverlay, editNote, addNewNotes } from '../../actions';



const mapDispatchToProps = {editNote, closeOverlay, addNewNotes}

const mapStateToProps = state => {
  return {
    overlayVisibility: state.restaurantDisplayReducer.overlayVisible,
    author: selectUserId(state),
    note: state.restaurantDisplayReducer.note,
    username: selectUserName(state),
    avatar: selectAvatar(state),
  }
}

export const NoteOverlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteOverlayDisplay)
