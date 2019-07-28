import React, {Component, Fragment} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import GooglePlaceInput from '../../components/googlePlacesInput';
import {auth} from '../../../config/firebaseconfig';

export const SearchDisplay = ({currentPage, moveToNextPageSearch, moveBackSearch}) => {
  return (
    <Fragment>
    {currentPage === 0 ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, marginBottom: 30}}>Find your local pick</Text>
        <TouchableOpacity
          onPress={moveToNextPageSearch}>
          <TextInput
            editable={false}
            pointerEvents="none"
            placeholder={'Enter your location'}
            style={{width: 250, marginVertical: 10, padding: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 3}}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View style={{ backgroundColor: 'darkgrey',flex: 1 }}>
        <View style={{flexDirection: 'row',paddingTop: 30, alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={moveBackSearch}
            style={{width:100}}>
            <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'white'}}>✗</Text>
          </TouchableOpacity>
        </View>
        <GooglePlaceInput />
      </View>
    )}
  </Fragment>
  )
}
