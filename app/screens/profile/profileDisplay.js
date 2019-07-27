import React, {Component} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import { NavigationEvents } from 'react-navigation';

export const ProfileDisplay = ({user, currentUser, userRestaurants, navigation, userLogout}) => {

  const {userName, city, firstName, lastName, avatar} = currentUser

  checkUserAuth = () => {
    if(!user) {
      navigation.navigate('UserAuth')
    }
  }

  viewNotes = (restaurantObj) => {
    navigation.navigate('RestaurantDisplay', restaurantObj);
  }

  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillFocus={checkUserAuth}/>
        <View style={{flex:1}}>
          <View style={{height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>{userName}</Text>
          </View>
          <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
            <Image source={{uri: `${avatar}`}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50, borderColor: 'lightgrey', borderWidth: 1.5}} />
            <View style={{marginRight: 10}}>
              <Text style={{paddingBottom: 5}}>{firstName} {lastName}</Text>
              <Text>{city}</Text>
            </View>
          </View>
          <View style={{paddingBottom: 20, borderBottomWidth: 1.5, borderBottomColor: 'lightgrey'}}>
            <TouchableOpacity
              style={{marginTop: 10, marginHorizontal: 40, paddingVertical: 10, borderRadius: 17, borderColor: 'grey', borderWidth: 1.5}}
              onPress={userLogout}
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
            data={userRestaurants}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View key={index} style={{paddingHorizontal: 23, paddingVertical: 10}}>
                <TouchableOpacity
                  onPress={(restaurantObj) => viewNotes(userRestaurants[index])}
                  >
                  <Image
                    source={{uri: item.link}}
                    style={{resizeMode: 'cover', width: '100%', height: 200, borderRadius: 5}}
                  />
                  <Text style={{fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase'}}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
    </View>
  )
}
