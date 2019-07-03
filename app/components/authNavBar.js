import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

export default props => {

  return (
    <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={props.handlePress}
        style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
        <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'white'}}>←</Text>
      </TouchableOpacity>
      <Text style={{color: 'white', fontSize: 24}}>{props.type}</Text>
    </View>
  )
}
