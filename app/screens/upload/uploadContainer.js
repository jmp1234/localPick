import {connect} from 'react-redux';
import {moveToNextUploadPage, moveBackUploadPage} from '../../actions';
import {UploadDisplay} from './uploadDisplay';
import {selectCoords} from '../../selectors/profileSelectors';
import {selectUserId} from '../../selectors/userSelectors';


const mapStateToProps = state => {
  return {
    user: selectUserId(state),
    coords: selectCoords(state),
    page: state.uploadReducer.currentPage
  }
}

const mapDispatchToProps = {moveToNextUploadPage, moveBackUploadPage}


export const UploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDisplay)