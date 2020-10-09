import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyByHo8Y1z-9RD2tMYSW0FY4Sj996V-WQyg",
    authDomain: "react-slack-2410d.firebaseapp.com",
    databaseURL: "https://react-slack-2410d.firebaseio.com",
    projectId: "react-slack-2410d",
    storageBucket: "react-slack-2410d.appspot.com",
    messagingSenderId: "994875461655",
    appId: "1:994875461655:web:c8f71544036da7ce024c52",
    measurementId: "G-GZZP7BPJ9L"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;