import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBFODOyJ6Ovxg9eIpT5SWU575SNbwXpNTE",
    authDomain: "ecommerce-f4f4ad.firebaseapp.com",
    projectId: "ecommerce-f4f4ad",
    storageBucket: "ecommerce-f4f4ad.appspot.com",
    messagingSenderId: "720056314277",
    appId: "1:720056314277:web:64c710d015bc18fb46204c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export
  export const auth = firebase.auth();
  export const googleprovider = new firebase.auth.GoogleAuthProvider()