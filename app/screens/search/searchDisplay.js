import React, { Component, Fragment } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Input, Header, Icon } from 'react-native-elements'
import GooglePlaceInput from '../../components/googlePlacesInput';
import { auth } from '../../../config/firebaseconfig';

export const SearchDisplay = ({currentPage, moveToNextPageSearch, moveBackSearch}) => {
  return (
    <Fragment>
    {currentPage === 0 ? (
      <ImageBackground source={require('../../../assets/coffeeBackground.jpeg')} style={{width: '100%', height: '100%'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.45)'}}>
        <Text style={{fontSize: 30, marginBottom: 30, color: 'white',
          textShadowColor: 'black',
          textShadowOffset: {width: -3, height: 3},
          textShadowRadius: 10}}
        >Find your local pick</Text>
        <TouchableOpacity
          onPress={moveToNextPageSearch}>
          <Input
            leftIcon={{ type: 'material', name: 'search', color: 'white' }}
            placeholderTextColor='white'
            editable={false}
            pointerEvents="none"
            placeholder={'Enter your location'}
            inputContainerStyle={{width: 250,borderWidth: 1, borderColor: 'white',
            borderShadowColor: 'black',
            borderShadowOffset: {width: -1, height: 1}, borderRadius: 3}}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
    ) : (
      <View style={{ backgroundColor: 'rgb(64,64,64)',flex: 1 }}>
        <Header
          centerComponent={{ text: 'Enter Location', style: { color: 'white'} }}
          leftComponent={{ icon: 'arrow-back', underlayColor: 'white', color: 'white', onPress: () => {
            moveBackSearch()
          }}}
          containerStyle={{
            backgroundColor: 'rgb(64,64,64)',
          }}
        />
        <GooglePlaceInput />
        <View style={{paddingBottom: 205, flex: 1, alignItems: 'center',justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <Icon
            name='city-variant-outline'
            type='material-community'
            color='white'
            size= {70}
            containerStyle={{

            }}
          />
          <View style={{alignItems: 'center'}}>
              <Text style={{color: 'white'}}>Discover the best spots to eat at</Text>
          </View>
        </View>
      </View>
    )}
  </Fragment>
  )
}
