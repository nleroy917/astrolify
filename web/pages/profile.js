import { FirebaseAuthConsumer } from "@react-firebase/auth";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

import Layout from '../components/layout/Layout';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const Profile = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (user) => {
      firebase.auth().currentUser.getIdToken(true).then(async function(idToken) {
        // Send token to api for verification and data fetching
        let hdrs = {
          'identity_token': idToken
        }
        try {
        let res = await axios.get(`${API_BASE}/users/${user.uid}`, {headers: hdrs})
        if(res.status === 200) {
          let data = res.data
          setProfile(data.user)
          setPlaylist(data.playlist)
          setLoading(false)
        }
      } catch(error) {
        alert(error)
      }
      }).catch(function(error) {
        // Handle error
      });
    }

    return (
      <>
       <FirebaseAuthConsumer>
         {({ isSignedIn, user, providerId }) => {
            if(isSignedIn) { 
             if(!profile){fetchProfile(user)}
            return (
             <div>
              {!loading ?
              <Layout
                seo={{title: "Profile"}}
              >
                <pre style={{ height: 300, overflow: "auto" }}>
                  {JSON.stringify({ profile, playlist }, null, 2)}
                </pre>
                <button onClick={()=>{
                  firebase.auth().signOut()
                  router.push('/')
                }}>
                  Sign Out
                </button>
              </Layout>
              : <div>Fetching Profile</div>
              }
              </div>
            );
            }
            else {
              return (
                <div>
                 <p>Please Sign In</p>
                 <button onClick={()=>router.push('/sign-in')}>Sign-In</button>
                </div>
              );
            }
          }}
       </FirebaseAuthConsumer>
      </>
    )
}

export default Profile;