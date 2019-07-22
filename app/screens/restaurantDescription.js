import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const Restaurant =  props => {

  const {address, name, website} = props.navigation.state.params

  return(
    <View style={{flex: 1}}>
      <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>✖︎</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>{name}</Text>
      </View>
      <View>
        <Text>{address}</Text>
        <Text>{website}</Text>
      </View>
    </View>
  )
}


export default withNavigation(Restaurant)
