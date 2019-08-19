import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator,
  ImageBackground, RefreshControl
 } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Image, Header, Icon } from 'react-native-elements';


export const LocalPicksDisplay = ({navigation, localPicksRefresh, city,
  localPicksArray, fetchNotes, localPicks, clearProfiles, fetchLocalPicks}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(34,34,34)'}}>
      <NavigationEvents onWillFocus={() => {
        navigation.dismiss()
        clearProfiles('instance2')
        }}
      />
      <Header
        centerComponent={{ text: city, style: { color: 'white', fontWeight: 'bold' } }}
        leftComponent={{ icon: 'arrow-back', underlayColor: 'rgb(64,64,64)', color: 'white', onPress: () => {
          localPicksRefresh()
          navigation.goBack()
        }}}
        containerStyle={{
          backgroundColor: 'rgb(64,64,64)',
        }}
      />
      {localPicksArray.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', marginBottom: 75}}>
          <Icon
            name='food'
            type='material-community'
            color='white'
            size={100}
            containerStyle={{marginTop: 43}}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white'}}>There are no local picks recommended in this city yet.</Text>
            <Text style={{color: 'white'}}>Search for another city to find the best spots!</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={localPicksArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View key={index} style={{paddingHorizontal: 23, paddingVertical: 10}}>
              <TouchableOpacity
                style={{borderColor: 'white', borderWidth: 1}}
                onPress={() => {
                  navigation.navigate('RestaurantDisplay', {restaurantId: item.key, namespace: 'instance2', ...localPicks[item.key], link: item.link})
                  fetchNotes(localPicks[item.key], item.key, item.link, 'instance2')
                }}
                >
                <ImageBackground
                  source={{uri: item.link}}
                  PlaceholderContent={<ActivityIndicator />}
                  style={{resizeMode: 'cover', width: '100%', height: 200, borderRadius: 5}}
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
  )
}
