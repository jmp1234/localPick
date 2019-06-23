import React, {Component} from 'react';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { withNavigation } from 'react-navigation';


class UserAuth extends Component {
  constructor(props) {
    super(props)
  }

  showSignUp = () => {
    console.log('show sign up')
  }

  showLogin = () => {
    console.log('show login')
  }


  render() {
    return (
      <ImageBackground source={require('../../assets/cafe.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 25, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Search')}
          style={{width:100}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'white'}}>X</Text>
        </TouchableOpacity>
      </View>
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
           <Text style={{textAlign: 'center', color: 'white', fontSize: 40, textShadowColor: 'black',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10}}>Discover Your Local Pick</Text>
         </View>
        <View style={{flex: 1, paddingBottom: 14, justifyContent: 'flex-end', alignItems: 'center', alignItems: 'stretch', paddingHorizontal: 10}}>
          <TouchableOpacity
            style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: '#79CDCD', borderRadius: 1}}
            onPress={() => this.showSignUp()}
          >
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'white', opacity: 0.9, borderRadius: 1, borderColor: 'black', borderWidth: 2}}
            onPress={() => this.showLogin()}
          >
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black', textAlign: 'center'}}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

export default withNavigation(UserAuth);
