import { EditProfileDisplay } from './editProfileDisplay';
import { connect } from 'react-redux';
import { selectAvatar, selectLastName,
  selectUserName, selectFirstName } from '../../selectors/userProfileSelectors';
import { findNewAvatar, editProfile, editFirstname,
  editLastname, editUsername} from '../../actions';



const mapDispatchToProps = {findNewAvatar, editProfile, editFirstname,
  editLastname, editUsername}

const mapStateToProps = state => {
  return {
    avatar: selectAvatar(state),
    userId: state.currentUser.user,
    newAvatarLink: state.editProfileReducer.url,
    defaultUserName: selectUserName(state),
    defaultFirstName: selectFirstName(state),
    defaultLastName: selectLastName(state),
    firstName: state.editProfileReducer.firstName,
    lastName: state.editProfileReducer.lastName,
    userName: state.editProfileReducer.userName,
  }
}

export const EditProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileDisplay)
