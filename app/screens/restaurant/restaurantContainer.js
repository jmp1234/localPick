import { connect } from 'react-redux';
import { selectUserNotes, selectNonUserNotes, selectUserNotesIds
} from '../../selectors/notesSelectors';
import { restaurantRefresh, fetchProfile, goBackFromProfile,
  openOverlay, userNotePressed, userNoteClosed,
  userNoteDeleted, deleteLocalPick
} from '../../actions';
import { RestaurantDisplay } from './restaurantDisplay';
import { arrayLength } from  '../../selectors/profileSelectors';
import { selectUserId } from '../../selectors/userSelectors';
import { selectUserName, selectUserRestaurants } from '../../selectors/userProfileSelectors';


const mapDispatchToProps = (dispatch, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
    return {
        restaurantRefresh: () => dispatch(restaurantRefresh(namespace)),
        fetchProfile: (userId, namespace, navigation) => dispatch(fetchProfile(userId, namespace, navigation)),
        goBackFromProfile: (namespace) => dispatch(goBackFromProfile(namespace)),
        openOverlay: () => dispatch(openOverlay()),
        userNotePressed: (commentId) => dispatch(userNotePressed(commentId)),
        userNoteClosed: () => dispatch(userNoteClosed()),
        userNoteDeleted: (restaurantId, commentId, namespace) => dispatch(userNoteDeleted(restaurantId, commentId, namespace)),
        deleteLocalPick: (restaurantId, userId, userNotesIds) => dispatch(deleteLocalPick(restaurantId, userId, userNotesIds)),
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userNotes: selectUserNotes(state, ownProps),
    nonUserNotes: selectNonUserNotes(state, ownProps),
    author: selectUserId(state),
    username: selectUserName(state),
    userRestaurants: selectUserRestaurants(state),
    focusedCommentId: state.restaurantDisplayReducer.focusedCommentId,
    userNotesIds: selectUserNotesIds(state, ownProps)
  }
}

export const RestaurantContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDisplay)
