import { ProfileDisplay } from './profileDisplay';
import { connect } from 'react-redux';
import { userLogout, fetchUserInfo, fetchNotes } from '../../actions';
import { selectCurrentUser, selectUserRestaurants, selectUserPhotosArray }
  from '../../selectors/userProfileSelectors';


const mapDispatchToProps = {userLogout, fetchUserInfo, fetchNotes}


const mapStateToProps = state => {
  return {
    userId: state.currentUser.user,
    currentUserObj: selectCurrentUser(state),
    userRestaurants: selectUserRestaurants(state),
    userPhotos: selectUserPhotosArray(state),
  }
}

export const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDisplay)
