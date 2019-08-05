import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Platform, Alert, ScrollView } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Swipeout from 'react-native-swipeout';

export const RestaurantDisplay = ({navigation, userNotes, nonUserNotes,
  restaurantRefresh, fetchProfile, goBackFromProfile, arrLength}) => {

  const {notes, address, name, website, link, namespace} = navigation.state.params

  console.log('rest ::::::::::::::;', arrLength)

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

  const UserLink = (props) => {
    return(
      <TouchableOpacity onPress={() => {
        fetchProfile(props.userId, namespace, navigation)
      }}>
        <Text style={{color: 'blue'}}>@{props.userName}</Text>
      </TouchableOpacity>
    )
  }

  const swipeoutBtns = [
  {
    text: 'Delete',
    backgroundColor: 'red',
    onPress: () => console.log('delete'),
  }
  ]


  return (
    <View style={{flex: 1}}>
      <Header
        centerComponent={{ text: name, style: { color: 'black', fontWeight: 'bold' } }}
        rightComponent={{icon: 'more-horiz', underlayColor: 'white', color: 'black', onPress: () => console.log('pressed')}}
        leftComponent={{ icon: 'arrow-back', underlayColor: 'white', color: 'black', onPress: () => {
          navigation.pop()
          if(arrLength > 1) {
            goBackFromProfile(navigation.state.params.namespace)
            restaurantRefresh()
          }
        }}}
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
          <Swipeout right={swipeoutBtns}>
          {
            userNotes.map((noteObj) => (
              <ListItem
                key={noteObj.commentId}
                title={noteObj.note}
                topDivider={true}
                bottomDivider={true}
                titleStyle={{fontSize: 11}}
              />
            ))
          }
        </Swipeout>
        </View>
        <View style={{marginTop: 30}}>
          {
            nonUserNotes.map((noteObj) => (
              <ListItem
                topDivider={true}
                bottomDivider={true}
                key={noteObj.commentId}
                subtitle={noteObj.note}
                subtitleStyle={{fontSize: 11}}
                title= <UserLink userId={noteObj.author} userName={noteObj.userName}/>
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
