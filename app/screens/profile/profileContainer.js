import { ProfileDisplay } from './profileDisplay';
import { connect } from 'react-redux';
import { fetchNotes, fetchUserInfo, goBackFromProfile } from '../../actions';
import { selectCurrentUser, selectUserRestaurants, selectUserPhotosArray } from '../../selectors/userProfileSelectors';
import { selectCurrentProfileObj, selectCurrentProfileRestaurants,
  selectProfilePhotosArray, arrayLength} from '../../selectors/profileSelectors';


// const mapDispatchToProps = {}


const mapStateToProps = (state, ownProps) => {
  console.log('love me')
  return {
    userId: state.currentUser.user,
    currentUserObj: selectCurrentProfileObj(state, ownProps),
    userRestaurants: selectCurrentProfileRestaurants(state, ownProps),
    userPhotos: selectProfilePhotosArray(state, ownProps),
  }
}

const mapDispatchToProps = {fetchUserInfo, fetchNotes, goBackFromProfile}
// const mapDispatchToProps = (dispatch, ownProps) => {
//   // const {namespace} = ownProps.navigation.state.params
//   // console.log('baby: ', namespace)
//     return {
//         // restaurantRefresh: () => dispatch(restaurantRefresh(namespace)),
//         // fetchProfile: (userId, namespace) => dispatch(fetchProfile(userId, namespace))
//     }
// }

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDisplay)
