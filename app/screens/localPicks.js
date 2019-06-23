import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class LocalPicks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{width:100}}>
            <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10}}>←</Text>
          </TouchableOpacity>
          <Text>Irvine</Text>
          <Text style={{width:100}}>Fast Casual</Text>
        </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Restaurant')}
          >
            <Image
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Foie_gras_en_cocotte.jpg'}}
              style={{resizeMode: 'cover', width: '100%', height: 240}}
            />
          </TouchableOpacity>
          <Text>Local Picks</Text>
      </View>
    )
  }
}

export default LocalPicks;
