import React, {Fragment} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config/config';
import {auth} from '../../../config/firebaseconfig';
import { NavigationEvents } from 'react-navigation';

export const UploadDisplay = ({user, coords, navigation, page, moveToNextUploadPage, moveBackUploadPage}) => {

  const checkUserAuth = () => {
    if(!user) {
      navigation.navigate('UserAuth')
    }
  }

  return (
    <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={checkUserAuth}/>
        <Fragment>
          {page === 0 ? (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Upload</Text>
              <TouchableOpacity
                onPress={moveToNextUploadPage}
                >
                <Text>➕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ backgroundColor: 'darkgrey',flex: 1 }}>
              <View style={{flexDirection: 'row',paddingTop: 30, alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={moveBackUploadPage}
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
                  const {name, website, formatted_address, id} = details
                  const photoReference = details.photos[0].photo_reference;
                  if(details.name) {
                    navigation.navigate('CreateNotes', {
                      name, website, address: formatted_address, photoReference, restaurantId: id
                    })
                  }
                }}
                query={{
                  key: config.GOOGLE_PLACES_KEY,
                  language: 'en',
                  types: 'establishment', // default: 'geocode'
                  strictbounds: true,
                  location: coords,
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
                debounce={200}
              />
            </View>
          )}
        </Fragment>
    </View>
  )
}
