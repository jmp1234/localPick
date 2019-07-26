import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const RestaurantDisplay = ({navigation}) => {

  const {notes, address, name, website, link} = navigation.state.params

  return (
    <View style={{flex: 1}}>
      <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>←</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>Notes</Text>
      </View>
      <View>
        <Image
          source={{uri: link}}
          style={{resizeMode: 'cover', width: '100%', height: 240}}
        />
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{name}</Text>
        <Text style={{textAlign: 'center'}}>{address}</Text>
        <Text style={{textAlign: 'center'}}>{website}</Text>
        <View style={{marginTop: 30, borderColor: 'blue', borderWidth: 0.5, borderRadius: 2}}>
          <Text style={{textAlign: 'center'}}>{notes}</Text>
        </View>
      </View>
    </View>
  )
}

export default RestaurantDisplay
