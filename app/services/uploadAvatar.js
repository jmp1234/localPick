import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { storage, database } from '../../config/firebaseconfig';


export function awaitStatus() {
  const {status} = Permissions.askAsync(Permissions.CAMERA)
  return status;
}

export function awaitStatusRoll() {
  const {statusRoll} = Permissions.askAsync(Permissions.CAMERA_ROLL);
  return statusRoll;
}

export function awaitImagePicker() {
  let result = ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'Images',
    allowsEditing: true,
    quality: 1
  });
  return result
}

export function getResponse(uri) {
  return fetch(uri)
}

export function getBlob(response) {
  return response.blob()
}

export function uploadTask(userId, filepath, blob) {
  const uploaded = storage.ref('user/' + userId + '/img').child(filepath).put(blob);
  return uploaded
}

export function getUrl(uploadTask) {
  const url = uploadTask.ref.getDownloadURL();
  return url;
}

export function saveImageToDatabase(imageUrl, userId) {
  database.ref('/users/' + userId + '/avatar').set(imageUrl);
}
