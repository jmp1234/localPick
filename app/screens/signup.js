import React, {Component, Fragment} from 'react';
import { View, Alert, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView} from 'react-native';
import {auth, database} from '../../config/firebaseconfig';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../config/config';
import { withNavigation } from 'react-navigation';
import CitySignup from '../components/citySignup';
import {connect} from 'react-redux';
import {userSignup} from '../actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: '',
      coords: '',
      moveToSignup: false,
      inputFocus: false
    }
  }

  signup = () => {
    const {firstName, lastName, userName, email, password, city, coords, confirmPassword} = this.state;
    if(firstName && lastName && userName && email && password && confirmPassword && city && coords) {
      if(password !== confirmPassword) {
        Alert.alert('Signup error: ', 'Passwords do not match')
      } else {
        this.props.userSignup(email, password, firstName, lastName, userName, coords, city)
      }

    } else {
      Alert.alert('Signup error: ', 'Please conplete all fields')
    }
  }


  moveToSignupCheck = () => {
    if(this.state.city) {
      this.setState({moveToSignup: true})
    } else {
      Alert.alert('Signup error: ', 'Please enter a valid city')
    }
  }

  removeDescription = () => {
    this.setState({inputFocus: true})
  }

  addDescription = () => {
    this.setState({inputFocus: false})
  }

  setLocation = (data, details) => {
    const {lat, lng} = details.geometry.location
    this.setState({
      city: details.address_components[0].long_name,
      coords: `${lat}, ${lng}`
    })
  }

  render() {

    const focus = !this.state.inputFocus ? 'none' : 'block';
    return (
      <Fragment>
        {this.state.moveToSignup ? (
          <Fragment>
            <View style={{paddingTop: 40, flexDirection: 'column', alignItems: 'center', flex: 1, paddingHorizontal: 15}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.6)'
                    editable={true}
                    placeholder={'First Name'}
                    onChangeText={(text) => this.setState({firstName: text})}
                    value={this.state.firstName}
                    style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
                  />
                </View>
                <View style={{flex:1}}>
                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.6)'
                    editable={true}
                    placeholder={'Last Name'}
                    onChangeText={(text) => this.setState({lastName: text})}
                    value={this.state.lastName}
                    style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
                  />
                </View>
              </View>
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Username'}
                onChangeText={(text) => this.setState({userName: text})}
                value={this.state.userName}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Email Address'}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                keyboardType={'email-address'}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({confirmPassword: text})}
                value={this.state.confirmPassword}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
            </View>
            <KeyboardAvoidingView behavior="position" enabled style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
                  <TouchableOpacity
                    style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
                    onPress={this.signup}
                  >
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Sign Up</Text>
                  </TouchableOpacity>
            </KeyboardAvoidingView>
          </Fragment>

        ) : (
          <CitySignup
            inputFocus={this.state.inputFocus}
            handlePress={this.moveToSignupCheck}
            removeDescription = {this.removeDescription}
            addDescription = {this.addDescription}
            setLocation={(data, details) => this.setLocation(data, details)}
          />
        )}
      </Fragment>
    )
  }
}

const mapDispatchToProps = {userSignup}

export default withNavigation(connect(
  null,
  mapDispatchToProps
)(Signup));
