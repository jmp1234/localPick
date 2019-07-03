import React, {Component} from 'react';
import { View, Text } from 'react-native';
import UserAuth from '../components/auth';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }


  componentDidMount() {
    this.logUserIn();
  }

  logUserIn() {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.loggedIn ? (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Upload</Text>
          </View>
        ) : (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Log In to add a new local pick</Text>
          </View>
        )}
      </View>
    )
  }
}

export default Upload;
