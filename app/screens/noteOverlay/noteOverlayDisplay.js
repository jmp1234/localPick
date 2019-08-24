import React from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { Overlay } from 'react-native-elements';

export const NoteOverlayDisplay = ({editNote, author, overlayVisibility,
  restaurantId, note, username, avatar, namespace, closeOverlay, addNewNotes,
  charactersRemaining
}) => {

  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  const uniqueId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

  return (
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
          blurOnSubmit = {true}
        />
        <Text style={{position: 'absolute', bottom: 0, right: 0, color: 'darkgrey'}}>
          {charactersRemaining}
        </Text>
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
  )
}
