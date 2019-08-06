import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { userSignup } from '../../actions';
import SignupDisplay from './signupDisplay'

const mapDispatchToProps = {userSignup}

export const SignupContainer =  withNavigation(connect(
  null,
  mapDispatchToProps
)(SignupDisplay));
