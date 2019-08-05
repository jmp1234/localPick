import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Header, Image, Input } from 'react-native-elements';
import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { f, auth, database, storage } from '../../../config/firebaseconfig';
import { NavigationEvents } from 'react-navigation';

export const EditProfileDisplay = ({navigation, avatar, userId,
  findNewAvatar, newAvatarLink, editProfile, userName,
  firstName, lastName, editFirstname, editLastname, editUsername,
  defaultUserName, defaultFirstName, defaultLastName}) => {

  const image = newAvatarLink ? newAvatarLink : avatar

  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  const uniqueId = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

  const populateInputFields = () => {
    editFirstname(defaultFirstName)
    editLastname(defaultLastName)
    editUsername(defaultUserName)
  }


  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillFocus={populateInputFields}/>
      <Header
        centerComponent={{ text: 'Edit Profile', style: { color: 'black', fontWeight: 'bold' } }}
        leftComponent={{ icon: 'close', color: 'black', onPress: () => navigation.goBack()}}
        rightComponent={{ text: 'Save', color: 'blue', onPress: () => editProfile(image, userId)}}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      <View style={{flex:1}}>
        <View style={{justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10}}>
          <TouchableOpacity onPress={() => findNewAvatar(userId, uniqueId())}>
            <Image
              PlaceholderContent={<ActivityIndicator />}
              source={{uri: `${image}`}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50, borderColor: 'lightgrey', borderWidth: 1.5}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Input
            label='FIRST NAME'
            value={firstName}
            inputStyle={{color: 'blue'}}
            onChangeText={(text) => editFirstname(text)}
            // value={notes}
          />
          <Input
            label='LAST NAME'
            value={lastName}
            inputStyle={{color: 'blue'}}
            onChangeText={(text) => editLastname(text)}
          />
          <Input
            label='Username'
            value={userName}
            inputStyle={{color: 'blue'}}
            onChangeText={(text) => editUsername(text)}
          />
        </View>
      </View>

    </View>
  )
}
