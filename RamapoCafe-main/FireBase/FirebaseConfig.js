/**
  Firebase Configuration
  
  NAME
  
      Firebase Configuration - Initializes Firebase for the application.
  
  SYNOPSIS
  
      import firebase from 'firebase/compat/app';
      import "firebase/compat/auth";
      import "firebase/compat/firestore";
  
  DESCRIPTION
  
      This file configures and initializes Firebase for the RamapoCafe application.
      It imports the necessary Firebase modules including authentication and Firestore
      (database) functionality.
  
      The `firebaseConfig` object contains the Firebase project's configuration details,
      such as the API key, project ID, and other essential information needed to connect
      the application to the Firebase backend.
  
      The code checks if a Firebase app has already been initialized to avoid reinitializing
      it. If no app instance exists, `firebase.initializeApp(firebaseConfig)` is called to
      set up Firebase with the provided configuration.
  
  
  RETURNS
  
      Exports the initialized `firebase` object to be used throughout the application.
 */

import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDWElGqz_IOJyWRkrBca8JiEz-pvTOL9Ag",
  authDomain: "ramapocafe-66bcb.firebaseapp.com",
  projectId: "ramapocafe-66bcb",
  storageBucket: "ramapocafe-66bcb.appspot.com",
  messagingSenderId: "194291766349",
  appId: "1:194291766349:web:08ce7bfd20a09148bab804"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };