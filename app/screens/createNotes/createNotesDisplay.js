import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {auth, database} from '../../../config/firebaseconfig';
import { NavigationEvents, StackActions, NavigationActions } from 'react-navigation';

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: 'Upload' })],
// });
// this.props.navigation.dispatch(resetAction);

export const CreateNotesDisplay = ({userId, notes, navigation, restaurantUpload, addNotesAtUploadPage}) => {

  const {address, name, website, photoReference, restaurantId} = navigation.state.params
  // navigation.dispatch(resetAction)

  return(

    <View style={{flex: 1}}>
      <View style={{position: 'relative', height: 70, paddingTop: 30, borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: 100, left: 0, top: 35, justifyContent: 'center', position: 'absolute'}}>
          <Text style={{fontSize:24, fontWeight: 'bold', paddingLeft: 10, color: 'black'}}>←</Text>
        </TouchableOpacity>
        <Text style={{fontWeight: 'bold'}}>Add Notes</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>{name}</Text>
        <Text style={{fontWeight: 'bold'}}>{address}</Text>
        <Text style={{fontWeight: 'bold'}}>{website}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TextInput
          editable={true}
          placeholder={'Enter your notes'}
          onChangeText={(text) => addNotesAtUploadPage(text)}
          value={notes}
          style={{width: 250, marginVertical: 10, padding: 5, borderWidth: 1, borderColor: 'grey', borderRadius: 3}}
        />
      </View>
      <KeyboardAvoidingView behavior="position" enabled style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: 14}}>
        <TouchableOpacity
          style={{paddingVertical: 15, marginVertical: 5, paddingHorizontal: 20, backgroundColor: 'rgb(52, 177, 209)',borderRadius: 1}}
              onPress={() => restaurantUpload(restaurantId, address, name, website, userId, notes, photoReference)}
        >
          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>Add New Local Pick</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}
