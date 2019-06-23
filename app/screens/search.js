import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: ''
    }
  }

  enterLocation = () => {
    this.props.navigation.navigate('LocalPicks')
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, marginBottom: 30}}>Find your local pick</Text>
        <TextInput
          editable={true}
          placeholder={'Enter city or address'}
          onChangeText={(text) => this.setState({location: text})}
          value={this.state.location}
          style={{width: 250, marginVertical: 10, padding: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 3}}
        />
        <TouchableOpacity
          style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}
          onPress={() => this.enterLocation()}>
          <Text style={{color: 'white'}}>Find Local Picks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}
          onPress={() => this.props.navigation.navigate('UserAuth')}>
          <Text style={{color: 'white'}}>Log In</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


export default Search;
