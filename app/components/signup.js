import React, {Component, Fragment} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView} from 'react-native';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      moveToLocation: false
    }
  }

  render() {
    return (
      <Fragment>
        {!this.state.moveToLocation ? (
          <Fragment>
            <View style={{paddingTop: 40, flexDirection: 'column', alignItems: 'center', flex: 1, paddingHorizontal: 15}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex:1}}>
                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.6)'
                    editable={true}
                    placeholder={'First Name'}
                    onChangeText={(text) => this.setState({firstName: text})}
                    value={this.state.firstName}
                    style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
                  />
                </View>
                <View style={{flex:1}}>
                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.6)'
                    editable={true}
                    placeholder={'Last Name'}
                    onChangeText={(text) => this.setState({lastName: text})}
                    value={this.state.lastName}
                    style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
                  />
                </View>
              </View>
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Username'}
                onChangeText={(text) => this.setState({username: text})}
                value={this.state.username}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Email Address'}
                onChangeText={(text) => this.setState({email: text})}
                value={this.state.email}
                keyboardType={'email-address'}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password: text})}
                value={this.state.password}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                editable={true}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({confirmPassword: text})}
                value={this.state.confirmPassword}
                style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
              />
            </View>
            <KeyboardAvoidingView behavior="position" enabled style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
                  <TouchableOpacity
                    style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
                    onPress={() => this.setState({moveToLocation: true})}
                  >
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Continue</Text>
                  </TouchableOpacity>
            </KeyboardAvoidingView>
          </Fragment>

        ) : (
          <Fragment>
            <View style={{backgroundColor: 'rgba(0,0,0,0.45)',paddingTop: 40,flexDirection: 'column', alignItems: 'center', flex: 1, paddingHorizontal: 15}}>
              <Text style={{textAlign: 'center', color: 'white',fontSize: 30, textShadowColor: 'black',
               textShadowOffset: {width: -1, height: 1},
               textShadowRadius: 10}}>Where are your favorite local restaurants?</Text>
               <Text style={{marginTop: 8, textAlign: 'center', color: 'silver',fontSize: 18, textShadowColor: 'black',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10}}>You have the opportunity to recommend your favorite places from your location of choice!</Text>
            </View>
            <TextInput
              placeholderTextColor='rgba(0, 0, 0, 0.6)'
              editable={true}
              placeholder={'Enter Location'}
              onChangeText={(text) => this.setState({confirmPassword: text})}
              value={this.state.confirmPassword}
              style={{width: '100%', marginVertical: 2, padding: 8, borderWidth: 1, borderColor: 'grey', borderRadius: 3, backgroundColor: 'white'}}
            />
            <KeyboardAvoidingView behavior="position" enabled style={{backgroundColor: 'rgba(0,0,0,0.45)', flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
                  <TouchableOpacity
                    style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
                  >
                    <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Submit Location</Text>
                  </TouchableOpacity>
            </KeyboardAvoidingView>
          </Fragment>
        )}
      </Fragment>
    )
  }
}


export default Signup;
