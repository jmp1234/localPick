import React, {Component} from 'react';
import { View, Text } from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Search</Text>
      </View>
    )
  }
}

export default Search;
