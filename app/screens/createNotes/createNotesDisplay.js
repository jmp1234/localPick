import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { auth, database } from '../../../config/firebaseconfig';
import { NavigationEvents, StackActions, NavigationActions } from 'react-navigation';

export const CreateNotesDisplay = ({userId, notes, navigation,
  restaurantUpload, addNotesAtUploadPage, charactersRemaining,
  userName, avatar}) => {

  const {address, name, website, photoReference, restaurantId, timestamp, city} = navigation.state.params

  const checkUserAuth = () => {
    if(!userId) {
      navigation.goBack()
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

  return(

    <View style={{flex: 1}}>
      <NavigationEvents onWillFocus={checkUserAuth}/>
      <View style={{position: 'relative', height: 70, paddingTop: 30,
        borderColor: 'lightgrey', borderBottomWidth: 0.5,
        justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>←</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>Add Notes</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>{name}</Text>
        <Text style={{fontWeight: 'bold'}}>{address}</Text>
      </View>
      <View style={{borderColor: 'lightgrey', borderWidth: 1, padding: 5, marginTop: 30}}>
        <TextInput
          editable={true}
          placeholder={'Enter your notes'}
          onChangeText={(text) => addNotesAtUploadPage(text)}
          value={notes}
          multiline = {true}
          maxLength = {200}
          numberOfLines={4}
          style={{height: 85, justifyContent: "flex-start"}}
        />
      </View>
      <Text>{charactersRemaining}</Text>
      <KeyboardAvoidingView behavior="position" enabled style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
        <TouchableOpacity
          style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
              onPress={() => restaurantUpload(restaurantId, address, name, website, userId, notes,
                photoReference, timestamp, city, uniqueId(), userName, avatar)}
        >
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Add New Local Pick</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}
