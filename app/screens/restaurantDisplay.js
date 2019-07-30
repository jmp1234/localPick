import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Platform, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import {selectUserNotes, selectNonUserNotes} from '../selectors/notesSelectors';
import { ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import {restaurantRefresh} from '../actions';

const RestaurantDisplay = ({navigation, userNotes, nonUserNotes, restaurantRefresh}) => {

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

  console.log('::::::::::::::::', userNotes)
    console.log('::::::::::::::::', nonUserNotes)

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
        <View style={{marginTop: 30, borderColor: 'blue', borderWidth: 0.5, borderRadius: 2}}>
          {
            userNotes.map((noteObj) => (
              <ListItem
                key={noteObj.commentId}
                // leftAvatar={{ source: { uri: l.avatar_url } }}
                // title={l.name}
                title={noteObj.note}
                // subtitle={l.subtitle}
              />
            ))
          }
        </View>
        <View style={{marginTop: 30, borderColor: 'red', borderWidth: 0.5, borderRadius: 2}}>
          {
            nonUserNotes.map((noteObj) => (
              <ListItem
                key={noteObj.commentId}
                title={noteObj.note}
              />
            ))
          }
        </View>
      </View>
    </View>
  )
}

const mapDispatchToProps = {restaurantRefresh}

const mapStateToProps = state => {
  return {
    userNotes: selectUserNotes(state),
    nonUserNotes: selectNonUserNotes(state),
  }
}

export  default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDisplay)
