import React, {Component, Fragment} from 'react';
import { View, Alert, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView} from 'react-native';
import {auth, database} from '../../config/firebaseconfig';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../config/config';
import { withNavigation } from 'react-navigation';

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

  createUserObj(userObj, email) {
    const {firstName, lastName, userName, coords, city} = this.state
    const uObj = {
      firstName, lastName, userName, email, coords, city,
      avatar: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png'
    }
    database.ref('users').child(userObj.uid).set(uObj).then(() => {
      this.props.navigation.goBack()
    });
  }

  signup = () => {
    const {firstName, lastName, userName, email, password, city, coords, confirmPassword} = this.state;
    if(firstName && lastName && userName && email && password && confirmPassword && city && coords) {
      if(password !== confirmPassword) {
        Alert.alert('Signup error: ', 'Passwords do not match')
      } else {
        let user = auth.createUserWithEmailAndPassword(email, password)
          .then(userObj => this.createUserObj(userObj.user, email))
          .catch(error => Alert.alert('Signup error: ', error.message))
      }

    } else {
      Alert.alert('Signup error: ', 'Please conplete all fields')
    }
  }


  moveToSignupCheck = () => {
      this.setState({moveToSignup: true})
  }

  render() {
    console.log('state: email: ', this.state)
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
          <Fragment>
            {!this.state.inputFocus ? (
              <View style={{backgroundColor: 'rgba(0,0,0,0.45)',paddingTop: 40,flexDirection: 'column', alignItems: 'center', flex: 1, paddingHorizontal: 15}}>
                <Text style={{textAlign: 'center', color: 'white',fontSize: 30, textShadowColor: 'black',
                 textShadowOffset: {width: -1, height: 1},
                 textShadowRadius: 10}}>Where are your favorite local restaurants?</Text>
                 <Text style={{marginTop: 8, textAlign: 'center', color: 'silver',fontSize: 18, textShadowColor: 'black',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10}}>You have the opportunity to recommend your favorite places from your location of choice!</Text>
              </View>
            ) : (
              <Fragment></Fragment>
            )}
            <GooglePlacesAutocomplete
              textInputProps={{
                onFocus: () => this.setState({inputFocus: true}),
                onBlur: () => this.setState({inputFocus: false})
              }}
              placeholder='Enter city'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              getDefaultValue={() => ''}
              query={{
                key: config.GOOGLE_PLACES_KEY,
                language: 'en', // language of the results
                types: '(cities)' // default: 'geocode'
              }}
              styles={{
                container: {
                  backgroundColor: 'rgba(0,0,0,0.45)',
                },
                textInputContainer: {
                  width: '100%'
                },
                description: {
                  fontWeight: 'bold',
                  color: 'white'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
                listView: {
                  display: `${!this.state.inputFocus ? 'none' : 'block'}`
                }
              }}
              currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
              }}
              GooglePlacesSearchQuery={{
                rankby: 'distance',
                types: 'food'
              }}
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                // console.log('city: ', details.address_components[0].long_name)
                const {lat, lng} = details.geometry.location
                // console.log('coords: ', `${lat}, ${lng}`)
                this.setState({
                  city: details.address_components[0].long_name,
                  coords: `${lat}, ${lng}`
                })
              }}
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
            <View style={{backgroundColor: 'rgba(0,0,0,0.45)', flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
              <TouchableOpacity
                style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
                onPress={this.moveToSignupCheck}
              >
                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </Fragment>
    )
  }
}


export default withNavigation(Signup);
