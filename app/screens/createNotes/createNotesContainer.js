import { restaurantUpload, addNotesAtUploadPage } from '../../actions';
import { selectUserId } from '../../selectors/userSelectors';
import { selectUserName, selectAvatar } from '../../selectors/userProfileSelectors'
import { selectCharactersRemaining, selectNotes } from '../../selectors/uploadSelectors'
import { CreateNotesDisplay } from './createNotesDisplay';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    userId: selectUserId(state),
    notes: selectNotes(state),
    charactersRemaining: selectCharactersRemaining(state),
    userName: selectUserName(state),
    avatar: selectAvatar(state),
  }
}

const mapDispatchToProps = {restaurantUpload, addNotesAtUploadPage}

export const CreateNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNotesDisplay);
