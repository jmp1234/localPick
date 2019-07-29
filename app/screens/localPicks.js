import React, {Component} from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import {connect} from 'react-redux';
import { Image } from 'react-native-elements';
import {selectLocalPicksArray, selectCity} from '../selectors/localPicksSelectors';
import {localPicksRefresh} from '../actions';

class LocalPicks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: ''
    }
  }

  // componentDidMount() {
  //   this.checkParams();
  // }
  //
  //
  // checkParams() {
  //   const params = this.props.navigation.state.params;
  //
  //   if(params) {
  //     if(params.city) {
  //       this.setState({
  //         city: params.city
  //       });
  //     }
  //   }
  // }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationEvents onWillFocus={() => this.props.navigation.dismiss()}/>
        <View style={{flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => {
              this.props.localPicksRefresh()
              this.props.navigation.goBack()
            }}
            style={{width:100}}>
            <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10}}>←</Text>
          </TouchableOpacity>
          <Text>{this.props.city}</Text>
          <Text style={{width:100}}>Fast Casual</Text>
        </View>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Restaurant')}
          >
            <Image
              source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Foie_gras_en_cocotte.jpg'}}
              style={{resizeMode: 'cover', width: '100%', height: 240}}
            />
          </TouchableOpacity> */}

          <FlatList
            data={this.props.localPicks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View key={index} style={{paddingHorizontal: 23, paddingVertical: 10}}>
                <TouchableOpacity
                  // onPress={(restaurantObj) => viewNotes(userRestaurants[index])}
                  >
                  <Image
                    PlaceholderContent={<ActivityIndicator />}
                    source={{uri: item.link}}
                    style={{resizeMode: 'cover', width: '100%', height: 200, borderRadius: 5}}
                  />
                  <Text style={{fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase'}}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />

      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    localPicks: selectLocalPicksArray(state),
    city: selectCity(state)
  }
}

const mapDispatchToProps = {localPicksRefresh}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalPicks);
