import React, {Fragment} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, Text, TouchableOpacity, TextInput} from 'react-native';

export default ({inputFocus, handlePress, removeDescription, addDescription, setLocation}) => {

  return(
    <Fragment>
      {!inputFocus && (
        <View style={{backgroundColor: 'rgba(0,0,0,0.45)',paddingTop: 40,flexDirection: 'column', alignItems: 'center', flex: 1, paddingHorizontal: 15}}>
          <Text style={{textAlign: 'center', color: 'white',fontSize: 30, textShadowColor: 'black',
           textShadowOffset: {width: -1, height: 1},
           textShadowRadius: 10}}>Where are your favorite local restaurants?</Text>
           <Text style={{marginTop: 8, textAlign: 'center', color: 'silver',fontSize: 18, textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10}}>You have the opportunity to recommend your favorite places from your location of choice!</Text>
        </View>
      )}
      <GooglePlacesAutocomplete
        textInputProps={{
          onFocus: removeDescription,
          onBlur: addDescription
        }}
        placeholder='Enter city'
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed='auto'
        fetchDetails={true}
        renderDescription={row => row.description}
        getDefaultValue={() => ''}
        query={{
          key: config.GOOGLE_PLACES_KEY,
          language: 'en',
          types: '(cities)'
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
            display: `${!inputFocus ? 'none' : 'block'}`
          }
        }}
        currentLocation={true}
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch'
        GoogleReverseGeocodingQuery={{
        }}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
          types: 'food'
        }}
        onPress={(data, details = null) => {
          setLocation(data, details)
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        debounce={200}
      />
      <View style={{backgroundColor: 'rgba(0,0,0,0.45)', flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
        <TouchableOpacity
          style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
          onPress={handlePress}
        >
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Continue</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}
