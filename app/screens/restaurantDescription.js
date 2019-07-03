import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default props => {

  return(
    <View style={{flex: 1}}>
      <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>✖︎</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>Burger King Description</Text>
      </View>
    </View>
  )
}
