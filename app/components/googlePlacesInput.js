import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import config from '../../config/config';
import { withNavigation } from 'react-navigation';
import { database } from '../../config/firebaseconfig';
import { connect } from 'react-redux';
import { fetchLocalPicks } from '../actions';

export const GooglePlaceInput = ({navigation, fetchLocalPicks}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2}
      autoFocus={false}
      returnKeyType={'search'}
      listViewDisplayed='auto'
      fetchDetails={true}
      renderDescription={row => row.description}
      onPress={(data, details = null) => {
        const city = data.structured_formatting.main_text
        fetchLocalPicks(city)
      }}

      getDefaultValue={() => ''}

      query={{
        key: config.GOOGLE_PLACES_KEY,
        language: 'en',
        types: '(cities)'
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

      currentLocation={true}
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch'
      GoogleReverseGeocodingQuery={{
      }}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        types: 'food'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = {fetchLocalPicks}

export default withNavigation(connect(
  mapStateToProps,
  mapDispatchToProps
)(GooglePlaceInput))
