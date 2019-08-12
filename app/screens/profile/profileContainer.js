import { ProfileDisplay } from './profileDisplay';
import { connect } from 'react-redux';
import { fetchNotes, fetchUserInfo, goBackFromProfile } from '../../actions';
import { selectCurrentUser, selectUserRestaurants, selectUserPhotosArray } from '../../selectors/userProfileSelectors';
import { selectCurrentProfileObj, selectCurrentProfileRestaurants,
  selectProfilePhotosArray, arrayLength,
selectCurrentProfileUsername, selectCurrentProfileCity, selectCurrentProfileFirstname,
selectCurrentProfileLastname, selectCurrentProfileAvatar } from '../../selectors/profileSelectors';


// const mapDispatchToProps = {}


const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.currentUser.user,
    currentUserObj: selectCurrentProfileObj(state, ownProps),
    userRestaurants: selectCurrentProfileRestaurants(state, ownProps),
    userPhotos: selectProfilePhotosArray(state, ownProps),
    userName: selectCurrentProfileUsername(state, ownProps),
    firstName: selectCurrentProfileFirstname(state, ownProps),
    lastName: selectCurrentProfileLastname(state, ownProps),
    city: selectCurrentProfileCity(state, ownProps),
    avatar: selectCurrentProfileAvatar(state, ownProps),
  }
}

const mapDispatchToProps = {fetchUserInfo, fetchNotes, goBackFromProfile}


export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDisplay)
