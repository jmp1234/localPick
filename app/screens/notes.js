import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class RestaurantNotes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
            <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>←</Text>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold'}}>Notes</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Restaurant')}
          >
            <Image
              source={{uri: 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg'}}
              style={{resizeMode: 'cover', width: '100%', height: 240}}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }


}

export default RestaurantNotes;
