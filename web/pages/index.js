import { FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';
import { firebaseConfig } from '../config/firebase-config';
import Home from './home';
export default function App() {
  return(
    <>
      <IfFirebaseAuthed>
        <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
        <Home />
      </IfFirebaseUnAuthed>
    </>
  )
}
