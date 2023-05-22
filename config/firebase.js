import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvT2gy1xtmNcFIz6UMFqfbWQ__6X1LM40",
  authDomain: "chatapp-firebase-3840a.firebaseapp.com",
  projectId: "chatapp-firebase-3840a",
  storageBucket: "chatapp-firebase-3840a.appspot.com",
  messagingSenderId: "523660502974",
  appId: "1:523660502974:web:f01d9c6255e3a5ff7f7bef",
  measurementId: "G-NYM24JQV64",
};
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
