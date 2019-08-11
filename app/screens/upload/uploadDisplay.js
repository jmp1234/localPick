import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../../config/config';
import { auth } from '../../../config/firebaseconfig';
import { NavigationEvents } from 'react-navigation';
import { Header } from 'react-native-elements';

export const UploadDisplay = ({user, coords, navigation, page,
  moveToNextUploadPage, moveBackUploadPage, restaurants}) => {

  const checkUserAuth = () => {
    if(!user) {
      navigation.navigate('UserAuth')
    }
  }

  return (
    <Fragment>
        <NavigationEvents onWillFocus={checkUserAuth}/>
        <Fragment>
          {page === 0 ? (
            <Fragment>
              <ImageBackground source={require('../../../assets/fancydinner.jpg')} style={{width: '100%', height: '100%'}}>
              {/* <Header
                // centerComponent={{ text: 'Recommend a New Restaurant', style: { color: 'black'} }}
                containerStyle={{
                  backgroundColor: 'transparent',
                }}
              /> */}
              <View style={{flex: 1, justifyContent: 'space-between', alignItems: 'center',  backgroundColor: 'rgba(0,0,0,0.45)'}}>
                {/* <View style={{justifyContent: 'flex-end',flex: 1}}> */}
                <View></View>
                <View>
                  <Text style={{marginTop: 50, marginBottom: 20, fontSize: 30, color: 'white', textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width: -3, height: 3},
                    textShadowRadius: 10}}>Share your local pick</Text>
                  <Text style={{fontSize: 15, textAlign: 'center', color: 'white',
                    textShadowColor: 'black',
                    textShadowOffset: {width: -3, height: 3},
                    textShadowRadius: 10}}>Allow others to view your favorite restaurants</Text>
                  </View>
                {/* </View> */}
                {/* <TouchableOpacity
                  onPress={moveToNextUploadPage}
                  >
                  <Text>➕</Text>
                </TouchableOpacity> */}
                  <View style={{width: '100%', paddingHorizontal: 15, paddingBottom: 14}}>
                      <TouchableOpacity
                        style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
                        onPress={moveToNextUploadPage}
                      >
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Recommend a restaurant</Text>
                      </TouchableOpacity>
                  </View>
              </View>
            </ImageBackground>
            </Fragment>
          ) : (
            <View style={{ backgroundColor: 'rgb(64,64,64)',flex: 1 }}>
              {/* <View style={{flexDirection: 'row',paddingTop: 30, alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={moveBackUploadPage}
                  style={{width:100}}>
                  <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'white'}}>✗</Text>
                </TouchableOpacity>
              </View> */}
              <Header
                centerComponent={{ text: 'Enter Your Pick', style: { color: 'white'} }}
                leftComponent={{ icon: 'arrow-back', underlayColor: 'white', color: 'white', onPress: () => {
                  moveBackUploadPage()
                }}}
                containerStyle={{
                  backgroundColor: 'rgb(64,64,64)',
                }}
              />
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
                  const cityComponent = details.address_components.filter(addressType => {
                    return addressType.types.includes('locality')
                  })
                  const city = cityComponent[0].long_name;
                  const photoReference = details.photos[0].photo_reference;
                  const dateTime = Date.now();
                  const timestamp = Math.floor(dateTime/1000);
                  if(details.name && !restaurants[id]) {
                    navigation.navigate('CreateNotes', {
                      name, website, photoReference, city, timestamp,
                      address: formatted_address,
                      restaurantId: id
                    })
                  }
                  if(restaurants[id]) {
                    Alert.alert('Upload Error', 'You have already recommended this local pick')
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
                  container: {
                      backgroundColor: 'rgba(0,0,0,0.4)',
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
                }}
                debounce={200}
              />
            </View>
          )}
        </Fragment>
    </Fragment>
  )
}
