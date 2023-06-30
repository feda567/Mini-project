// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyB0ZI-m84wyyLhA4KZ35R0ty4RF_Ct0Dj0",
  authDomain: "poll-67c94.firebaseapp.com",
  databaseURL: "https://poll-67c94-default-rtdb.firebaseio.com",
  projectId: "poll-67c94",
  storageBucket: "poll-67c94.appspot.com",
  messagingSenderId: "409870212823",
  appId: "1:409870212823:web:7469d3d220c652a491da92",
  measurementId: "G-H6GBERMMK7"
};



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage,provider };
export default firebase;