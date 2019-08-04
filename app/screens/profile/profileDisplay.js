import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Image, Avatar, Icon, Header } from 'react-native-elements';
import { database } from '../../../config/firebaseconfig';

export const ProfileDisplay = ({userId, currentUserObj, userRestaurants,
  navigation, userLogout, fetchNotes, userPhotos, goBackFromProfile}) => {

  const {userName, city, firstName, lastName, avatar} = currentUserObj

  checkUserAuth = () => {
    if(!userId) {
      navigation.navigate('UserAuth')
    }
  }

  viewNotes = (restaurantObj) => {
    fetchNotes(restaurantObj, restaurantObj.key)
  }

  const BackButton = () => {
    return(
      <Fragment>
        {navigation.state.params && (
        <Icon
          name='arrow-back'
          type='material'
          color='black'
          onPress={() => {
            navigation.goBack()
            // navigation.navigate('Profile')
            // goBackFromProfile(navigation.state.params.namespace)
          }}
        />
        )}
      </Fragment>
    )
  }

  const EditButton = () => {
    return(
      <Fragment>
        {!navigation.state.params && (
        <Icon
          name='edit'
          type='material'
          color='black'
          onPress={() => navigation.navigate('EditProfile')}
        />
        )}
      </Fragment>
    )
  }


  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillFocus={checkUserAuth}/>
      <Header
        leftComponent={<BackButton />}
        centerComponent={{ text: userName, style: { color: 'black', fontWeight: 'bold' } }}
        rightComponent={<EditButton />}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
        <View style={{flex:1}}>
          <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
            <Image
              PlaceholderContent={<ActivityIndicator />}
              source={{uri: `${avatar}`}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50, borderColor: 'lightgrey', borderWidth: 1.5}}
            />
            <View style={{marginRight: 10}}>
              <Text style={{paddingBottom: 5}}>{firstName} {lastName}</Text>
              <Text>{city}</Text>
            </View>
          </View>
          {!navigation.state.params && (
            <View style={{paddingBottom: 20, borderBottomWidth: 1.5, borderBottomColor: 'lightgrey'}}>
              <TouchableOpacity
                style={{marginTop: 10, marginHorizontal: 40, paddingVertical: 10, borderRadius: 17, borderColor: 'grey', borderWidth: 1.5}}
                onPress={userLogout}
                >
                <Text style={{textAlign: 'center', color: 'grey'}}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={{backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 5, borderBottomWidth: 1.5, borderBottomColor: 'lightgrey'}}>
            {/* <TouchableOpacity>
              <Text style={{fontWeight: 'bold'}}>Fast Casual</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontWeight: 'bold'}}>Casual</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontWeight: 'bold'}}>Fine Dining</Text>
            </TouchableOpacity> */}
          </View>
          {Object.keys(userRestaurants).length === 0 ? (
            <Fragment>
              <Icon
                name='food'
                type='material-community'
                color='lightgrey'
                size={100}
                containerStyle={{marginTop: 43}}
              />
              <View style={{alignItems: 'center'}}>
                <Text style={{color: 'grey'}}>Seems like you have no recommendations yet.</Text>
                <Text style={{color: 'grey'}}>
                  <Text>Click</Text>
                  <Text
                    onPress={() => navigation.navigate('Upload')}
                    style={{fontWeight: 'bold', color: '#606060'}}> here</Text>
                  <Text> to add a new local pick.</Text>
                </Text>
              </View>
            </Fragment>
          ) : (
            <FlatList
              data={userPhotos}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View key={index} style={{paddingHorizontal: 23, paddingVertical: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      const namespace = navigation.state.params ? navigation.state.params.namespace: 'instance1'
                      // navigation.navigate('RestaurantDisplay', {namespace, ...userRestaurants[item.key], link: item.link})
                      navigation.push('RestaurantDisplay', {namespace, ...userRestaurants[item.key], link: item.link})
                      fetchNotes(userRestaurants[item.key], item.key, item.link, namespace)
                    }}
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
          )}
        </View>
    </View>
  )
}
