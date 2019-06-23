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
    // this.logUserIn();
  }

  logUserIn() {
    this.setState({
      loggedIn: true
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Upload</Text>
          </View>
      </View>
    )
  }
}

export default Upload;
