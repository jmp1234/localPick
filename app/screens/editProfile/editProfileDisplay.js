import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Header, Image, Input, Badge, Divider } from 'react-native-elements';
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
        centerComponent={{ text: 'Edit Profile', style: { color: 'white', fontWeight: 'bold' } }}
        leftComponent={{ icon: 'close', underlayColor: 'rgb(34,34,34)', color: 'white', onPress: () => navigation.goBack()}}
        rightComponent={{ text: 'Save', style: {color: 'white'}, onPress: () =>
          editProfile(image, userId, firstName, lastName, userName)
        }}
        containerStyle={{
          backgroundColor: 'rgb(34,34,34)',
        }}
      />
      <View style={{flex:1}}>
        <View style={{justifyContent: 'space-evenly', alignItems: 'center',
          flexDirection: 'row', paddingVertical: 10}}
        >
          <View style={{marginTop: 10}}>
            <Image
              PlaceholderContent={<ActivityIndicator />}
              source={{uri: `${image}`}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50, borderColor: 'lightgrey', borderWidth: 1.5}}
            />
            <Badge
              status='primary'
              top={0}
              value='edit'
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              onPress={() => findNewAvatar(userId, uniqueId())}
            />
          </View>
        </View>
        <View style={{borderTopWidth: 1, borderTopColor: 'lightgrey',
          paddingTop: 10}}
        >
          <Input
            label='FIRST NAME'
            value={firstName}
            inputStyle={{color: 'blue'}}
            onChangeText={(text) => editFirstname(text)}
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
            onChangeText={(text) => editUsername(text.replace(' ', '_'))}
          />
        </View>
      </View>

    </View>
  )
}
