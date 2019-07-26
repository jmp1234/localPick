import {ProfileDisplay} from './profileDisplay';
import {connect} from 'react-redux';
import {userLogout, fetchUserInfo} from '../../actions';
import {selectCurrentUser, selectUserRestaurantsArray, selectUserRestaurantsInfo} from '../../selectors/profileSelectors';



const mapDispatchToProps = {userLogout, fetchUserInfo}

const mapStateToProps = state => {
  return {
    user: state.currentUser.user,
    currentUser: selectCurrentUser(state),
    userRestaurants: selectUserRestaurantsArray(state),
    userRestaurantsInfo: selectUserRestaurantsInfo(state)
  }
}

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDisplay)
