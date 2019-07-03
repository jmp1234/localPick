import React, {Component, Fragment} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import GooglePlaceInput from '../components/googlePlacesInput';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      page: 0,
    }
  }

  enterLocation = () => {
    //go to local picks page:
    // this.props.navigation.navigate('LocalPicks')

    //go to the google places input field:
    this.setState({
      page: 1
    })
  }

  render() {
    return (
      <Fragment>
      {this.state.page === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, marginBottom: 30}}>Find your local pick</Text>
          <TouchableOpacity
            onPress={() => this.enterLocation()}>
            <TextInput
              editable={false}
              pointerEvents="none"
              placeholder={'Enter your location'}
              onChangeText={(text) => this.setState({location: text})}
              value={this.state.location}
              style={{width: 250, marginVertical: 10, padding: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 3}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}
            onPress={() => this.props.navigation.navigate('UserAuth')}>
            <Text style={{color: 'white'}}>Log In</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ backgroundColor: 'darkgrey', paddingTop: 20, flex: 1 }}>
          <View style={{flexDirection: 'row',paddingTop: 30, alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => this.setState({page: 0})}
              style={{width:100}}>
              <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'white'}}>✖︎</Text>
            </TouchableOpacity>
          </View>
          <GooglePlaceInput />
        </View>
      )}
    </Fragment>
    )
  }
}


export default Search;
