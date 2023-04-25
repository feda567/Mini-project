// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDAtSTmvysGCQlnPeUHpAJ9ghWoW_4o3QU",
  authDomain: "rough-97efd.firebaseapp.com",
  projectId: "rough-97efd",
  storageBucket: "rough-97efd.appspot.com",
  messagingSenderId: "382822935380",
  appId: "1:382822935380:web:fe7c8b88333564c28476c1"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage,provider };
export default firebase;