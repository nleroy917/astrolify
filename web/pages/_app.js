import '../styles/globals.css'

import { firebaseConfig } from '../config/firebase-config';
import firebase from "firebase/app";
import "firebase/auth";
import { FirebaseAuthProvider } from '@react-firebase/auth';

function Astrolify({ Component, pageProps }) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <FirebaseAuthProvider firebase={firebase} config={firebaseConfig}>
      <Component {...pageProps} />
    </FirebaseAuthProvider>
  )
}

export default Astrolify
