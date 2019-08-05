import { EditProfileDisplay } from './editProfileDisplay';
import { connect } from 'react-redux';
import { selectAvatar } from '../../selectors/userProfileSelectors';
import { findNewAvatar } from '../../actions';



const mapDispatchToProps = {findNewAvatar}

const mapStateToProps = state => {
  return {
    avatar: selectAvatar(state),
    userId: state.currentUser.user,
    newAvatarLink: state.editProfileReducer.url
  }
}

export const EditProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileDisplay)
