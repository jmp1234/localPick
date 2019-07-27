import {restaurantUpload, addNotesAtUploadPage} from '../../actions';
import {selectUserId} from '../../selectors/userSelectors';
import {CreateNotesDisplay} from './createNotesDisplay';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    userId: selectUserId(state),
    notes: state.uploadReducer.notes
  }
}

const mapDispatchToProps = {restaurantUpload, addNotesAtUploadPage}

export const CreateNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateNotesDisplay);
