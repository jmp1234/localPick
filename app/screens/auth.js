import React, {Component} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView} from 'react-native';
import { withNavigation } from 'react-navigation';
import {LoginContainer} from './login';
import {SignupContainer} from './signup';
import AuthNavBar from '../components/authNavBar';
import {Header} from 'react-native-elements';


class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authPage: 0,
    }
  }

  showSignUp = () => {
    this.setState({
      authPage: 1
    })
  }

  showLogin = () => {
    this.setState({
      authPage: 2
    })
  }

  goBack = () => {
    this.setState({
      authPage: 0
    })
  }


  render() {
    return (
      <ImageBackground source={require('../../assets/cafe.jpg')} style={{width: '100%', height: '100%'}}>
      {this.state.authPage === 0 ? (
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row',paddingTop: 30, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}
              style={{width:100}}>
              <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'white'}}>✗</Text>
            </TouchableOpacity>
          </View>
           {/* <Header
            leftComponent={{ icon: 'close', color: 'white', underlayColor: 'transparent', onPress: () => this.props.navigation.navigate('Search')}}
            containerStyle={{
              backgroundColor: 'transparent',
              borderBottomColor: 'transparent'
            }}
          /> */}
            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
               <Text style={{textAlign: 'center', color: 'white', fontSize: 40, textShadowColor: 'black',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10}}>Discover Your Local Pick</Text>
             </View>
            <View style={{flex: 1, paddingBottom: 14, justifyContent: 'flex-end', alignItems: 'center', alignItems: 'stretch', paddingHorizontal: 15}}>
              <TouchableOpacity
                style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)', borderRadius: 1}}
                onPress={() => this.showSignUp()}
              >
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Join Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'white', opacity: 0.9, borderRadius: 1, borderColor: 'black', borderWidth: 2}}
                onPress={() => this.showLogin()}
              >
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black', textAlign: 'center'}}>Log In</Text>
              </TouchableOpacity>
            </View>
        </View>
      ) : (

        <View style={{flex: 1}}>
          {this.state.authPage === 1 ? (
            <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
              <AuthNavBar type='Sign Up' handlePress={this.goBack}/>
              <SignupContainer />
            </View>
          ) : (
            <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'column'}}>
              <AuthNavBar type='Log In' handlePress={this.goBack}/>
              <LoginContainer />
            </View>

          )}
        </View>
      )}
      </ImageBackground>
    )
  }
}

export default withNavigation(UserAuth);
