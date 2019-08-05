import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Header, Image } from 'react-native-elements';
import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { f, auth, database, storage } from '../../../config/firebaseconfig';

export const EditProfileDisplay = ({navigation, avatar, userId,
  findNewAvatar, newAvatarLink}) => {

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

  const checkPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

}

  const findNewImage = async (uri) => {
  checkPermissions();

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'Images',
    allowsEditing: true,
    quality: 1
  });

  console.log('result: ', result);
  if(!result.cancelled) {
    uploadImage(result.uri);
  } else {
    console.log('cancelled')
  }
}

const uploadImage = async (uri) => {
  var that = this;
  var userid = userId
  var imageId = uniqueId()

  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(uri)[1];
  // var imageId = 2
  const response = await fetch(uri);
  const blob = await response.blob();
  var FilePath = imageId + '.' + ext;

  var uploadTask = storage.ref('user/' + userid + '/img').child(FilePath).put(blob);

  uploadTask.on('state_changed', function(snapshot) {
  }, function(error) {
    console.log('error with upload: ', error)
  }, function() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      that.processUpload(downloadURL)
    })
  })
}

processUpload = (imageUrl) => {

  database.ref('/users/' + userId + '/avatar').set(imageUrl);

  alert('image uploaded');

}

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
      {/* <TouchableOpacity onPress={() => findNewImage()}> */}
      <TouchableOpacity onPress={() => findNewAvatar(userId, uniqueId())}>
        <Image
          PlaceholderContent={<ActivityIndicator />}
          source={{uri: `${image}`}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50, borderColor: 'lightgrey', borderWidth: 1.5}}
        />
      </TouchableOpacity>
    </View>
  )
}
