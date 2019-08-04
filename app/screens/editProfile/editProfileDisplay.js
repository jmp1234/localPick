import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Header, Image } from 'react-native-elements';
import React from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { f, auth, database, storage } from '../../../config/firebaseconfig';

export const EditProfileDisplay = ({navigation, avatar, userId}) => {

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
  // this.setState({
  //   camera: status
  // })
  const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  // this.setState({
  //   cameraRoll: statusRoll
  // })
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
    console.log('upload image');
    // this.setState({
    //   imageSelected: true,
    //   imageId: this.uniqueId(),
    //   uri: result.uri
    // })
    uploadImage(result.uri);
  } else {
    console.log('cancelled')
    // this.setState({
    //   imageSelected: false
    // })
  }
}

const uploadImage = async (uri) => {
  var that = this;
  var userid = userId
  var imageId = uniqueId()

  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(uri)[1];
  // this.setState({
  //   currentFileType: ext,
  //   uploading: true
  // })
  //
  var imageId = 2
  const response = await fetch(uri);
  const blob = await response.blob();
  var FilePath = imageId + '.' + ext;

  var uploadTask = storage.ref('user/' + userid + '/img').child(FilePath).put(blob);

  uploadTask.on('state_changed', function(snapshot) {
    var progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
    console.log('upload is '+ progress+ '% complete');
    // that.setState({
    //   progress: progress
    // })
  }, function(error) {
    console.log('error with upload: ', error)
  }, function() {
    //upload is complete
    // that.setState({
    //   progress: 100,
    // })
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      that.processUpload(downloadURL)
    })
  })
}

processUpload = (imageUrl) => {
  //process here...

  //set needed info

  //set user photos object
  database.ref('/users/' + userId + '/avatar').set(imageUrl);

  alert('image uploaded');

  // this.setState({
  //   uploading: false,
  //   imageSelected: false,
  //   caption: '',
  //   uri: '',
  // })
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
      <Text>Edit Profile</Text>
      <TouchableOpacity onPress={() => findNewImage()}>
        <Image
          PlaceholderContent={<ActivityIndicator />}
          source={{uri: `${avatar}`}} style={{marginLeft: 10, width: 100, height: 100, borderRadius: 50, borderColor: 'lightgrey', borderWidth: 1.5}}
        />
      </TouchableOpacity>
    </View>
  )
}
