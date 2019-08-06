import { connect } from 'react-redux';
import { moveToNextUploadPage, moveBackUploadPage } from '../../actions';
import { UploadDisplay } from './uploadDisplay';
import { selectCoords, selectUserRestaurants } from '../../selectors/userProfileSelectors';
import { selectUserId } from '../../selectors/userSelectors';


const mapStateToProps = state => {
  return {
    user: selectUserId(state),
    coords: selectCoords(state),
    restaurants: selectUserRestaurants(state),
    page: state.uploadReducer.currentPage
  }
}

const mapDispatchToProps = {moveToNextUploadPage, moveBackUploadPage}


export const UploadContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDisplay)
