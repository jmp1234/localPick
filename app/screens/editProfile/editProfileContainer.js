import { EditProfileDisplay } from './editProfileDisplay';
import { connect } from 'react-redux';
import { selectAvatar } from '../../selectors/userProfileSelectors';



const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {
    avatar: selectAvatar(state),
    userId: state.currentUser.user
  }
}

export const EditProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileDisplay)
