import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking, Platform, Alert,
  ScrollView, TextInput, ImageBackground
} from 'react-native';
import { Header, ListItem, Overlay, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Action from '../../components/actionSheet';
import { NoteOverlayContainer } from '../noteOverlay';

export const RestaurantDisplay = ({navigation, userNotes, nonUserNotes,
  restaurantRefresh, fetchProfile, goBackFromProfile,
  openOverlay, author, username, userRestaurants, userNotePressed,
  focusedCommentId, userNoteClosed, userNoteDeleted, deleteLocalPick,
  userNotesIds}) => {

  const {notes, address, name, website, link, namespace, restaurantId} = navigation.state.params

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

  const UserLink = ({userId, userName, date}) => {
    return(
      <Text style={{marginTop: 8}}>
        <Text
          onPress={() => fetchProfile(userId, namespace, navigation)}
          style={{fontSize: 12, color: 'dodgerblue'}}
        >
          {userName}
        </Text>
      <Text style={{fontSize: 12, color: 'grey'}}> - {date}</Text>
      </Text>
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

  const pluralCheck = s => {
    if(s == 1) {
      return ' ago';
    } else {
      return 's ago';
    }
    }

  const timeConverter = timestamp => {
    var a = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - a) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if(interval > 1) {
      return interval + ' year' + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if(interval > 1) {
      return interval + ' month' + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 86400);
    if(interval > 1) {
      return interval + ' day' + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 3600);
    if(interval > 1) {
      return interval + ' hour' + pluralCheck(interval);
    }
    interval = Math.floor(seconds / 60);
    if(interval > 1) {
      return interval + ' minute' + pluralCheck(interval);
    }
    return Math.floor(seconds) + ' second' + pluralCheck(seconds);
  }

  return (

    <View style={{flex: 1}}>
      <NoteOverlayContainer namespace={namespace} restaurantId={restaurantId}/>
      <Header
        centerComponent={{ text: name, style: { color: 'white', fontWeight: 'bold' } }}
        rightComponent={userRestaurants[restaurantId] && (
          <Action openOverlay={openOverlay} deleteLocalPick={deleteLocalPick}
            restaurantId={restaurantId} userId={author} userNotesIds={userNotesIds}
          />
        )}
        leftComponent={{ icon: 'arrow-back', underlayColor: 'rgb(34,34,34)', color: 'white', onPress: () => {
          navigation.pop()
            restaurantRefresh()
        }}}
        containerStyle={{
          backgroundColor: 'rgb(34,34,34)'
        }}
      />
      <ScrollView>
      <View>
        <ImageBackground
          source={{uri: link}}
          style={{resizeMode: 'cover', width: '100%', height: 240}}
        >

      </ImageBackground>
        <Text  style={{textAlign: 'center', marginTop: 8}}>{address}</Text>
        <TouchableOpacity onPress={goToMaps}>
        <Text  style={{textAlign: 'center', color: 'dodgerblue'}}>Get Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToWebsite}>
          <Text style={{textAlign: 'center', color: 'dodgerblue'}}>Visit Website</Text>
        </TouchableOpacity>
        <View>
          {userNotes.length > 0 && (
            <Text style={{fontWeight: 'bold', backgroundColor: 'lightgrey', paddingVertical: 4, marginTop: 30}}>
              My recommendations:
            </Text>
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
                  subtitle={` - ${timeConverter(noteObj.posted)}`}
                  topDivider={true}
                  bottomDivider={true}
                  titleStyle={{fontSize: 12}}
                  subtitleStyle={{fontSize: 12, color: 'grey', marginTop: 5}}
                >
                </ListItem>
              </Swipeout>
            ))
          }
        </View>
        <View>
          {nonUserNotes.length > 0 && (
            <Text
              style={{fontWeight: 'bold', backgroundColor: 'lightgrey', paddingVertical: 4, marginTop: 30}}
            >
              Local Reviews:
            </Text>
          )}
          {
            nonUserNotes.map((noteObj) => (
              <ListItem
                topDivider={true}
                bottomDivider={true}
                leftAvatar={{ source: { uri: noteObj.avatar } }}
                key={noteObj.commentId}
                title={noteObj.note}
                subtitle= <UserLink userId={noteObj.author}
                  date={timeConverter(noteObj.posted)}
                  userName={`@${noteObj.userName}`}/>
                titleStyle={{fontSize: 12}}
              />
            ))
          }
        </View>
      </View>
    </ScrollView>
    </View>
  )
}
