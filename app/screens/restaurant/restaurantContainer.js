import { connect } from 'react-redux';
import { selectUserNotes, selectNonUserNotes } from '../../selectors/notesSelectors';
import { restaurantRefresh, fetchProfile, goBackFromProfile,
  openOverlay, closeOverlay, addNewNotes, editNote, userNotePressed, userNoteClosed,
  userNoteDeleted
} from '../../actions';
import { RestaurantDisplay } from './restaurantDisplay';
import { arrayLength } from  '../../selectors/profileSelectors';
import { selectUserId } from '../../selectors/userSelectors';
import { selectAvatar, selectUserName, selectUserRestaurants } from '../../selectors/userProfileSelectors';


const mapDispatchToProps = (dispatch, ownProps) => {
  const {namespace} = ownProps.navigation.state.params
    return {
        restaurantRefresh: () => dispatch(restaurantRefresh(namespace)),
        fetchProfile: (userId, namespace, navigation) => dispatch(fetchProfile(userId, namespace, navigation)),
        goBackFromProfile: (namespace) => dispatch(goBackFromProfile(namespace)),
        openOverlay: () => dispatch(openOverlay()),
        closeOverlay: () => dispatch(closeOverlay()),
        addNewNotes: (restaurantId, notesId, author, note, posted, userName, avatar) => {
          dispatch(addNewNotes(restaurantId, notesId, author, note, posted, userName, avatar, namespace))
        },
        editNote: (text) => dispatch(editNote(text)),
        userNotePressed: (commentId) => dispatch(userNotePressed(commentId)),
        userNoteClosed: () => dispatch(userNoteClosed()),
        userNoteDeleted: (restaurantId, commentId, namespace) => dispatch(userNoteDeleted(restaurantId, commentId, namespace))
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userNotes: selectUserNotes(state, ownProps),
    nonUserNotes: selectNonUserNotes(state, ownProps),
    overlayVisibility: state.restaurantDisplayReducer.overlayVisible,
    note: state.restaurantDisplayReducer.note,
    author: selectUserId(state),
    avatar: selectAvatar(state),
    username: selectUserName(state),
    userRestaurants: selectUserRestaurants(state),
    focusedCommentId: state.restaurantDisplayReducer.focusedCommentId
  }
}

export const RestaurantContainer =  connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDisplay)
