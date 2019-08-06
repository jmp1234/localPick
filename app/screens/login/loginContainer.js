import { userLogin } from '../../actions';
import { connect } from 'react-redux';
import { withNavigation, NavigationEvents } from 'react-navigation';
import LoginDisplay from './loginDisplay';



const mapDispatchToProps = {userLogin}

const mapStateToProps = state => {
  return {
    user: state.currentUser.user
  }
}

export const LoginContainer = withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginDisplay))
