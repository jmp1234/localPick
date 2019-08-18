import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Platform, Alert, ScrollView, TextInput, ImageBackground } from 'react-native';
import { Header, ListItem, Overlay } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Action from '../../components/actionSheet';

export const RestaurantDisplay = ({navigation, userNotes, nonUserNotes,
  restaurantRefresh, fetchProfile, goBackFromProfile,
  openOverlay, closeOverlay, overlayVisibility, addNewNotes, editNote, note,
  author, avatar, username, userRestaurants, userNotePressed,
  focusedCommentId, userNoteClosed, userNoteDeleted, deleteLocalPick,
  userNotesIds
}) => {

  const {notes, address, name, website, link, namespace, restaurantId} = navigation.state.params

  const goToMaps = () => {
    let daddr = encodeURIComponent(`${address}`);
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  }

  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  const uniqueId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

  const goToWebsite = () => {
    Linking.openURL(website).catch((err) => Alert.alert('An error occurred', err))
  }

  const UserLink = (props) => {
    return(
      <TouchableOpacity onPress={() => {
        fetchProfile(props.userId, namespace, navigation)
      }}>
        <Text style={{fontWeight: 'bold'}}>{props.userName}</Text>
      </TouchableOpacity>
    )
  }

  const swipeoutBtns = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => {
        userNoteDeleted(restaurantId, focusedCommentId, namespace);
      },
    }
  ]

  return (
    <View style={{flex: 1}}>
    <Overlay
      isVisible={overlayVisibility}
      windowBackgroundColor='rgba(169, 169, 169, .8)'
      width='80%'
      height='80%'
    >
    <View style={{borderColor: 'lightgrey', borderWidth: 1, padding: 5, marginTop: 30}}>
      <TextInput
        editable={true}
        placeholder={'Enter your notes'}
        onChangeText={(text) => editNote(text)}
        value={note}
        multiline = {true}
        enablesReturnKeyAutomatically={true}
        maxLength = {200}
        numberOfLines={4}
        style={{height: 85, justifyContent: "flex-start"}}
      />
    </View>
      <TouchableOpacity
        style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
        onPress={() => {
          const userId = author
          const dateTime = Date.now();
          const posted = Math.floor(dateTime/1000);
          closeOverlay()
          addNewNotes(restaurantId, uniqueId(), userId, note, posted, username, avatar, namespace)
        }}
      >
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Add Note</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{color: 'grey'}} onPress={closeOverlay}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </Overlay>
      <Header
        centerComponent={{ text: name, style: { color: 'black', fontWeight: 'bold' } }}
        rightComponent={userRestaurants[restaurantId] && (
          <Action openOverlay={openOverlay} deleteLocalPick={deleteLocalPick}
            restaurantId={restaurantId} userId={author} userNotesIds={userNotesIds}
          />
        )}
        leftComponent={{ icon: 'arrow-back', underlayColor: 'white', color: 'black', onPress: () => {
          navigation.pop()
            restaurantRefresh()
        }}}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      <ScrollView>
      <View>
        <ImageBackground
          source={{uri: link}}
          style={{resizeMode: 'cover', width: '100%', height: 240}}
        >

      </ImageBackground>
        <Text  style={{textAlign: 'center'}}>{address}</Text>
        <TouchableOpacity onPress={goToMaps}>
        <Text  style={{textAlign: 'center', color: 'dodgerblue'}}>Get Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToWebsite}>
          <Text style={{textAlign: 'center', color: 'dodgerblue'}}>Visit Website</Text>
        </TouchableOpacity>
        <View style={{marginTop: 30}}>
          {userNotes.length > 0 && (
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>My recommendations:</Text>
          )}
          {
            userNotes.map((noteObj) => (
              <Swipeout
                onOpen={() => userNotePressed(noteObj.commentId)}
                onClose={userNoteClosed}
                key={noteObj.commentId} right={swipeoutBtns}
              >
                <ListItem
                  key={noteObj.commentId}
                  title={noteObj.note}
                  topDivider={true}
                  bottomDivider={true}
                  titleStyle={{fontSize: 11}}
                >
                </ListItem>
              </Swipeout>
            ))
          }
        </View>
        <View style={{marginTop: 30}}>
          {nonUserNotes.length > 0 && (
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Other recommendations:</Text>
          )}
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
