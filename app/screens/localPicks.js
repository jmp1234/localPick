import React, {Component} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

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
            <Text style={{fontSize:12, fontWeight: 'bold', paddingLeft: 10}}>Go Back</Text>
          </TouchableOpacity>
          <Text>Irvine</Text>
          <Text style={{width:100}}>Fast Casual</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Local Picks</Text>
        </View>
      </View>
    )
  }
}

export default LocalPicks;
