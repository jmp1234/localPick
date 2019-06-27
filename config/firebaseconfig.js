import firebase from 'firebase';
import config from './config';
//
// // Initialize Firebase
firebase.initializeApp(config.firebaseConfig);


export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
