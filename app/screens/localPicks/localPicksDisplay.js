import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Image, Header, Icon } from 'react-native-elements';


export const LocalPicksDisplay = ({navigation, localPicksRefresh, city, localPicks}) => {
  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillFocus={() => navigation.dismiss()}/>
      {/* <View style={{flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => {
            localPicksRefresh()
            navigation.goBack()
          }}
          style={{width:100}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10}}>←</Text>
        </TouchableOpacity>
        <Text>{city}</Text>
        <Text style={{width:100}}>Fast Casual</Text>
      </View> */}
      <Header
        centerComponent={{ text: city, style: { color: 'black', fontWeight: 'bold' } }}
        leftComponent={{ icon: 'arrow-back', underlayColor: 'white', color: 'black', onPress: () => {
          localPicksRefresh()
          navigation.goBack()
        }}}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      {localPicks.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', marginBottom: 75}}>
          <Icon
            name='food'
            type='material-community'
            color='lightgrey'
            size={100}
            containerStyle={{marginTop: 43}}
          />
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'grey'}}>There are no local picks recommended in this city yet.</Text>
            <Text style={{color: 'grey'}}>Search for another city to find the best spots!</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={localPicks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View key={index} style={{paddingHorizontal: 23, paddingVertical: 10}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RestaurantDisplay', localPicks[index])}
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
  )
}
