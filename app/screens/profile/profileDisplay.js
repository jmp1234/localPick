import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator,
  ImageBackground
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Image, Avatar, Icon, Header, Divider } from 'react-native-elements';
import { database } from '../../../config/firebaseconfig';

export const ProfileDisplay = ({userId, currentUserObj, userRestaurants,
  navigation, userLogout, fetchNotes, userPhotos, goBackFromProfile, clearProfiles,
  userName, city, firstName, lastName, avatar
  }) => {

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
          color='white'
          onPress={() => {
            navigation.goBack();
            goBackFromProfile(navigation.state.params.namespace)

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
          color='white'
          onPress={() => navigation.navigate('EditProfile')}
        />
        )}
      </Fragment>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationEvents onWillFocus={() => {
        checkUserAuth();
        if(!navigation.state.params && navigation.state.routeName === 'Profile' && navigation.isFocused()) {
          clearProfiles('instance1')
        }
      }}/>
      <Header
        leftComponent={<BackButton />}
        centerComponent={{ text: userName, style: { color: 'white', fontWeight: 'bold'} }}
        rightComponent={<EditButton />}
        containerStyle={{
          backgroundColor: 'rgb(34,34,34)',
          borderColor: 'rgb(34,34,34)'
        }}
      />
      <View style={{flex:1}}>
        <View style={{justifyContent: 'space-evenly', alignItems: 'center',
          flexDirection: 'row', paddingVertical: 15, backgroundColor: 'lightgrey'}}
        >
          <Image
            PlaceholderContent={<ActivityIndicator />}
            source={{uri: `${avatar}`}} style={{marginLeft: 10, width: 105,
              borderColor: 'rgb(34,34,34)',height: 105, borderWidth: 0.6, 
              borderRadius: 50}}
          />
          <View style={{marginRight: 10}}>
            <Text style={{color: 'black', paddingBottom: 5, fontWeight: 'bold' }}>{firstName} {lastName}</Text>
            <Text style={{color: 'black'}}>{city}</Text>
            {!navigation.state.params && (
              <TouchableOpacity
                style={{marginTop: 10}}
                onPress={userLogout}
                >
                <Text style={{color: 'grey'}}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Divider style={{ backgroundColor: 'darkgrey', height: 1}} />
        {userRestaurants && Object.keys(userRestaurants).length === 0 ? (
          <Fragment>
            <Icon
              name='food'
              type='material-community'
              color='darkgrey'
              size={100}
              containerStyle={{marginTop: 43}}
            />
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'rgb(64, 64, 64)'}}>Seems like you have no recommendations yet.</Text>
              <Text style={{color: 'rgb(64, 64, 64)'}}>
                <Text>Click</Text>
                <Text
                  onPress={() => navigation.navigate('Upload')}
                  style={{fontWeight: 'bold', color: 'skyblue'}}> here</Text>
                <Text> to add a new local pick.</Text>
              </Text>
            </View>
          </Fragment>
        ) : (
          <FlatList
            // style={{backgroundColor: 'rgb(64,64,64)'}}
            style={{backgroundColor: 'white'}}
            data={userPhotos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View key={index} style={{paddingHorizontal: 23, paddingVertical: 10}}>
                <TouchableOpacity
                  style={{borderRadius: 5}}
                  onPress={() => {
                    const namespace = navigation.state.params ? navigation.state.params.namespace: 'instance1'
                    navigation.push('RestaurantDisplay', {namespace, ...userRestaurants[item.key],
                      link: item.link, restaurantId: item.key})
                    fetchNotes(userRestaurants[item.key], item.key, item.link, namespace)
                  }}
                  >
                  <ImageBackground
                    source={{uri: item.link}}
                    PlaceholderContent={<ActivityIndicator />}
                    style={{resizeMode: 'cover', width: '100%', height: 200}}
                    imageStyle={{ borderRadius: 2, borderColor: 'black' }}
                    >
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: 'white',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          textShadowColor: 'rgba(0, 0, 0, 0.75)',
                          textShadowOffset: {width: -1, height: 1},
                          textShadowRadius: 10,
                        }}
                        >
                        {item.name}
                      </Text>
                    </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  )
}
