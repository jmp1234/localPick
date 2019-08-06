import { connect } from 'react-redux';
import { selectUserNotes, selectNonUserNotes } from '../../selectors/notesSelectors';
import { restaurantRefresh, fetchProfile, goBackFromProfile } from '../../actions';
import { RestaurantDisplay } from './restaurantDisplay';
import { arrayLength } from  '../../selectors/profileSelectors';


const mapDispatchToProps = (dispatch, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
    return {
        restaurantRefresh: () => dispatch(restaurantRefresh(namespace)),
        fetchProfile: (userId, namespace, navigation) => dispatch(fetchProfile(userId, namespace, navigation)),
        goBackFromProfile: (namespace) => dispatch(goBackFromProfile(namespace))
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userNotes: selectUserNotes(state, ownProps),
    nonUserNotes: selectNonUserNotes(state, ownProps),
    arrLength: arrayLength(state, ownProps)
  }
}

export const RestaurantContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDisplay)
