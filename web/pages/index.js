import { useEffect, useState } from 'react';

import { FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import firebase from "firebase/app";
import "firebase/auth";

import Home from './home';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(firebase.auth())
    //console.log(loaded)
  }, [loaded])
  return(
    <>
    { loaded ? 
    <>
        <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
            return (
               isSignedIn ?
               <div style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                <button
                onClick={()=>{firebase.auth().signOut()}}
              >
                Sign Out
              </button>
              </div>
              :
              <Home />
            );
          }}
        </FirebaseAuthConsumer>
      </>
    :
    <div>Loading...</div>}
    </>
  )
}
