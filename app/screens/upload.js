import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import GooglePlaceInput from '../components/googlePlacesInput';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../config/config';
import {auth} from '../../config/firebaseconfig';
import { NavigationEvents } from 'react-navigation';
import {connect} from 'react-redux';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
  }

  checkUserAuth = () => {
    if(!this.props.user) {
      this.props.navigation.navigate('UserAuth')
    }
  }

  // s4 = () => {
  // return Math.floor((1 + Math.random()) * 0x10000)
  // .toString(16)
  // .substring(1);
  // }
  //
  // uniqueId = () => {
  //   return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
  //   this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  // }


  render() {

    const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
    const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
    return (
      <View style={{flex: 1}}>
          <NavigationEvents onWillFocus={this.checkUserAuth}/>
          <Fragment>
            {this.state.page === 0 ? (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Upload</Text>
                <TouchableOpacity
                  onPress={() => this.setState({page: 1})}
                  >
                  <Text>➕</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ backgroundColor: 'darkgrey',flex: 1 }}>
                <View style={{flexDirection: 'row',paddingTop: 30, alignItems: 'center', justifyContent: 'space-between'}}>
                  <TouchableOpacity
                    onPress={() => this.setState({page: 0})}
                    style={{width:100}}>
                    <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'white'}}>✗</Text>
                  </TouchableOpacity>
                </View>
                <GooglePlacesAutocomplete
                  placeholder='Enter your recommendation'
                  minLength={2} // minimum length of text to search
                  autoFocus={false}
                  returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  listViewDisplayed='auto'    // true/false/undefined
                  fetchDetails={true}
                  currentLocation={false}
                  renderDescription={row => row.description} // custom description render
                  getDefaultValue={() => ''}
                  onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    const {name, website, formatted_address} = details
                    if(details.name) {
                      this.props.navigation.navigate('CreateNotes', {
                        name, website, address: formatted_address
                      })
                    }
                  }}
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: config.GOOGLE_PLACES_KEY,
                    language: 'en', // language of the results
                    types: 'establishment', // default: 'geocode'
                    strictbounds: true,
                    // location: '34.4208, -119.6982',
                    location: this.props.coords,
                    radius: 25000,
                  }}
                  styles={{
                    textInputContainer: {
                      width: '100%'
                    },
                    description: {
                      fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb'
                    }
                  }}
                  // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                  // GooglePlacesSearchQuery={{
                  //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  //   // rankby: 'distance',
                  //   type: 'food',
                  //   types: 'food',
                  //   key: config.GOOGLE_PLACES_KEY,
                  //   location: '48.8566, 2.3522',
                  //   radius: 3000,
                  // }}
                  debounce={200}
                />
              </View>
            )}
          </Fragment>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser.user,
    coords: state.profileReducer.coords
  }
}


export default connect(mapStateToProps)(Upload)
