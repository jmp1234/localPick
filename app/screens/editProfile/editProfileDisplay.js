import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import React from 'react';

export const EditProfileDisplay = ({navigation}) => {

  return (
    <View>
      <Header
        centerComponent={{ text: 'Edit Profile', style: { color: 'black', fontWeight: 'bold' } }}
        leftComponent={{ icon: 'close', color: 'black', onPress: () => navigation.goBack()}}
        rightComponent={{ text: 'Done', color: 'blue', onPress: () => console.log('done')}}
        containerStyle={{
          backgroundColor: 'white',
        }}
      />
      <Text>Edit Profile</Text>
    </View>
  )
}
