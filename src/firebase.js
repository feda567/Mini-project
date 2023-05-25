// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCK1oFh9sHuybnSLQidVsZYByoZ_lc8HXY",
  authDomain: "cusat-37be2.firebaseapp.com",
  projectId: "cusat-37be2",
  storageBucket: "cusat-37be2.appspot.com",
  messagingSenderId: "531409539038",
  appId: "1:531409539038:web:59c8f0bf491eba0ba4d74f"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage,provider };
export default firebase;