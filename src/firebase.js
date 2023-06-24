// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBCk3t_mgZTIOOnVcHDELmBonIra5_8xhg",
  authDomain: "cuco-jn.firebaseapp.com",
  projectId: "cuco-jn",
  storageBucket: "cuco-jn.appspot.com",
  messagingSenderId: "448540034347",
  appId: "1:448540034347:web:2058853c0957921b96316e"
};



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage,provider };
export default firebase;