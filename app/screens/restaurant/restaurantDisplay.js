import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Platform, Alert, ScrollView} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

export const RestaurantDisplay = ({navigation, userNotes, nonUserNotes, restaurantRefresh}) => {


  const {notes, address, name, website, link} = navigation.state.params

  const goToMaps = () => {
    let daddr = encodeURIComponent(`${address}`);
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  }

  const goToWebsite = () => {
    Linking.openURL(website).catch((err) => Alert.alert('An error occurred', err))
  }

  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillBlur={restaurantRefresh}/>
      <Header
        centerComponent={{ text: name, style: { color: 'black', fontWeight: 'bold' } }}
        rightComponent={{icon: 'more-horiz', underlayColor: 'white', color: 'black', onPress: () => console.log('pressed')}}
        leftComponent={{ icon: 'arrow-back', underlayColor: 'white', color: 'black', onPress: () => navigation.goBack()}}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      <ScrollView>
      <View>
        <Image
          source={{uri: link}}
          style={{resizeMode: 'cover', width: '100%', height: 240}}
        />
        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{name}</Text>
        <Text  style={{textAlign: 'center'}}>{address}</Text>
        <TouchableOpacity onPress={goToMaps}>
        <Text  style={{textAlign: 'center', color: 'dodgerblue'}}>Get Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToWebsite}>
          <Text style={{textAlign: 'center', color: 'dodgerblue'}}>Visit Website</Text>
        </TouchableOpacity>
        <View style={{marginTop: 30}}>
          {
            userNotes.map((noteObj) => (
              <ListItem
                key={noteObj.commentId}
                title={noteObj.note}
                topDivider={true}
                bottomDivider={true}
              />
            ))
          }
        </View>
        {/* <View style={{marginTop: 30, borderColor: 'red', borderWidth: 0.5, borderRadius: 2}}> */}
        <View style={{marginTop: 30}}>
          {
            nonUserNotes.map((noteObj) => (
              <ListItem
                topDivider={true}
                bottomDivider={true}
                key={noteObj.commentId}
                subtitle={noteObj.note}
                title= {`@${noteObj.userName}`}
                leftAvatar={{ source: { uri: noteObj.avatar } }}
                titleStyle={{color: 'blue', fontSize: 12, marginBottom: 10}}
              />
            ))
          }
        </View>
      </View>
    </ScrollView>
    </View>
  )
}
