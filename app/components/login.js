import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView} from 'react-native';
import {userLogin} from '../actions';
import {connect} from 'react-redux';
import {auth} from '../../config/firebaseconfig';
import { withNavigation } from 'react-navigation';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailText: '',
      passwordText: '',
    }
  }

  login = async() => {
    try {
      let user = await auth.signInWithEmailAndPassword('test@test.com', 'password');
      console.log('user logged in')
      console.log('props:',this.props)
      this.props.navigation.goBack()
    } catch(error) {
      console.log(error)
    }
  }

  render() {

    return (
      <Fragment>
        <View style={{paddingTop: 70, flexDirection: 'column', alignItems: 'center', flex: 1, paddingHorizontal: 15}}>
          <TextInput
            placeholderTextColor='rgba(0, 0, 0, 0.6)'
            editable={true}
            placeholder={'Email'}
            onChangeText={(text) => this.setState({emailText: text})}
            value={this.state.emailText}
            keyboardType={'email-address'}
            style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
          />
          <TextInput
            placeholderTextColor='rgba(0, 0, 0, 0.6)'
            editable={true}
            placeholder={'Password'}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({passwordText: text})}
            value={this.state.passwordText}
            style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
          />
        </View>
        <KeyboardAvoidingView behavior="position" enabled style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
              <TouchableOpacity
                style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
                onPress={this.login}
              >
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Log In</Text>
              </TouchableOpacity>
        </KeyboardAvoidingView>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
  // dispatching plain actions
  userLogin: () => dispatch(userLogin()),

  }
}

// export default connect(
//   null,
//   mapDispatchToProps
// )(Login)
export default withNavigation(Login);
