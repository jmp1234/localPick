import { restaurantUpload, addNotesAtUploadPage, uploadInputFocued, uploadInputBlurred
} from '../../actions';
import { selectUserId } from '../../selectors/userSelectors';
import { selectUserName, selectAvatar } from '../../selectors/userProfileSelectors'
import { selectCharactersRemaining, selectNotes, selectInputFocus } from '../../selectors/uploadSelectors'
import { CreateNotesDisplay } from './createNotesDisplay';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    userId: selectUserId(state),
    notes: selectNotes(state),
    charactersRemaining: selectCharactersRemaining(state),
    userName: selectUserName(state),
    avatar: selectAvatar(state),
    inputFocus: selectInputFocus(state)
  }
}

const mapDispatchToProps = {restaurantUpload, addNotesAtUploadPage,
  uploadInputFocued, uploadInputBlurred}

export const CreateNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNotesDisplay);
