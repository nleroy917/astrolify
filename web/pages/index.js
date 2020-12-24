import { useEffect, useState } from 'react';

import { FirebaseAuthConsumer } from '@react-firebase/auth';
import firebase from "firebase/app";
import "firebase/auth";

import Home from './home';

export default function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
  }, [])
  return(
    <>
      <Home />
    </>
  )
}
