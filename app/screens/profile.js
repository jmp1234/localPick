import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {auth} from '../../config/firebaseconfig';
import Auth from '../components/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      restaurants: [
        'McDonalds', 'Burger King', 'Taco Bell'
      ]
    }
  }

  componentDidMount() {
    console.log('profile did mount')
    // this.logUserIn();
    if(!this.state.loggedIn) {
      this.props.navigation.navigate('UserAuth')
    }
  }

  componentWillUnmount() {
    console.log('profile unmounted')
  }

  logUserIn() {
    this.setState({
      loggedIn: true
    })
  }

  viewNotes = () => {
    this.props.navigation.navigate('RestaurantNotes');
  }

  logout = () => {
    auth.signOut()
    .then(() => {
      console.log('logging user out...')
    }).catch(error => {
      console.log('error: ', error)
    })
  }

  render() {
    console.log('profile rendered')
    return (
      <View style={{flex: 1}}>
        {this.state.loggedIn ? (
          <View style={{flex:1}}>
            <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>@Username</Text>
            </View>
            <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
              <Image source={{uri: 'https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png'}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50, borderColor: 'lightgrey', borderWidth: 1.5}} />
              <View style={{marginRight: 10}}>
                <Text style={{paddingBottom: 5}}>Lebron James</Text>
                <Text>Los Angeles</Text>
              </View>
            </View>
            <View style={{paddingBottom: 20, borderBottomWidth: 1.5, borderBottomColor: 'lightgrey'}}>
              <TouchableOpacity
                style={{marginTop: 10, marginHorizontal: 40, paddingVertical: 10, borderRadius: 17, borderColor: 'grey', borderWidth: 1.5}}
                onPress={this.logout}
                >
                <Text style={{textAlign: 'center', color: 'grey'}}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginTop: 10, marginHorizontal: 40, paddingVertical: 10, borderRadius: 17, borderColor: 'grey', borderWidth: 1.5}}>
                <Text style={{textAlign: 'center', color: 'grey'}}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 5, borderBottomWidth: 1.5, borderBottomColor: 'lightgrey'}}>
              <TouchableOpacity>
                <Text style={{fontWeight: 'bold'}}>Fast Casual</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontWeight: 'bold'}}>Casual</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontWeight: 'bold'}}>Fine Dining</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.restaurants}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View key={index} style={{paddingHorizontal: 23, paddingVertical: 10}}>
                  <TouchableOpacity
                    onPress={() => this.viewNotes()}
                    >
                    <Image
                      source={{uri: 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg'}}
                      style={{resizeMode: 'cover', width: '100%', height: 200, borderRadius: 5}}
                    />
                    <Text style={{fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase'}}>{item}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          // <Text>Log In to View Your Profile</Text>
          <Auth />
        )}
      </View>
    )
  }
}

export default Profile;
