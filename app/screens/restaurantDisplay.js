import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Platform, Alert} from 'react-native';
import {Header} from 'react-native-elements';

const RestaurantDisplay = ({navigation}) => {

  const {notes, address, name, website, link} = navigation.state.params

  const goToMaps = () => {
    let daddr = encodeURIComponent(`${address}`);
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  }

  const goToWebsite = () => {
    console.log('clicked')
    Linking.openURL(website).catch((err) => Alert.alert('An error occurred', err))
  }

  return (
    <View style={{flex: 1}}>
      <Header
        centerComponent={{ text: name, style: { color: 'black', fontWeight: 'bold' } }}
        leftComponent={{ icon: 'arrow-back', underlayColor: 'white', color: 'black', onPress: () => navigation.goBack()}}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      {/* <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>←</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>Notes</Text>
      </View> */}
      <View>
        <Image
          source={{uri: link}}
          style={{resizeMode: 'cover', width: '100%', height: 240}}
        />
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{name}</Text>
        <Text  style={{textAlign: 'center'}}>{address}</Text>
        <TouchableOpacity onPress={goToMaps}>
            <Text  style={{textAlign: 'center', color: 'dodgerblue'}}>Get Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToWebsite}>
          <Text style={{textAlign: 'center', color: 'dodgerblue'}}>Visit Website</Text>
        </TouchableOpacity>
        <View style={{marginTop: 30, borderColor: 'blue', borderWidth: 0.5, borderRadius: 2}}>
          <Text style={{textAlign: 'center'}}>{notes}</Text>
        </View>
      </View>
    </View>
  )
}

export default RestaurantDisplay
