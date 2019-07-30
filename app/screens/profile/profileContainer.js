import {ProfileDisplay} from './profileDisplay';
import {connect} from 'react-redux';
import {userLogout, fetchUserInfo, fetchNotes} from '../../actions';
import {selectCurrentUser, selectUserRestaurantsArray} from '../../selectors/profileSelectors';



const mapDispatchToProps = {userLogout, fetchUserInfo, fetchNotes}

const mapStateToProps = state => {
  return {
    user: state.currentUser.user,
    currentUser: selectCurrentUser(state),
    userRestaurants: selectUserRestaurantsArray(state),
  }
}

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDisplay)
