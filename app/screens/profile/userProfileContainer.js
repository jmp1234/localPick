import { ProfileDisplay } from './profileDisplay';
import { connect } from 'react-redux';
import { userLogout, fetchUserInfo, fetchNotes, clearProfiles } from '../../actions';
import { selectCurrentUser, selectUserRestaurants, selectUserPhotosArray,
selectUserName, selectFirstName, selectLastName, selectCity, selectAvatar }
  from '../../selectors/userProfileSelectors';


const mapDispatchToProps = {userLogout, fetchUserInfo, fetchNotes, clearProfiles}


const mapStateToProps = state => {
  return {
    userId: state.currentUser.user,
    currentUserObj: selectCurrentUser(state),
    userRestaurants: selectUserRestaurants(state),
    userPhotos: selectUserPhotosArray(state),
    userName: selectUserName(state),
    firstName: selectFirstName(state),
    lastName: selectLastName(state),
    avatar: selectAvatar(state),
    city: selectCity(state),
  }
}

export const UserProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDisplay)
