import { FirebaseAuthConsumer } from "@react-firebase/auth";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import styles from '../styles/Profile.module.css';
import commonstyles from '../styles/common.module.css';

import Layout from '../components/layout/Layout';
import ProfileNav from '../components/layout/ProfileNav';
import { fetchHoroscope } from '../utils/zodiac';
import { generateGreeting} from '../config/greetings';
import { fetchSpotifyData } from '../utils/spotify';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

const Profile = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [horoscope, setHoroscope] = useState('')

    const fetchData = async (user) => {
      firebase.auth().currentUser.getIdToken(true).then(async function(idToken) {
        // Send token to api for verification and data fetching
        let hdrs = {
          'identity_token': idToken
        }
        try {
          // call server to get user's profile
          let res = await axios.get(`${API_BASE}/users/${user.uid}`, {headers: hdrs})

          // if sucess - proceed
          if(res.status === 200) {
            let data = res.data
            setProfile(data.user)
            setPlaylist(data.playlist)
            fetchHoroscope(data.user.zodiac)
              .then(horoscope=>setHoroscope(horoscope))
            setLoading(false)
            fetchSpotifyData(data.user.spotify_refresh_token, data.playlist.playlist_id)
              .then(playlist_data=>{
                console.log(playlist_data.body.tracks)
                setPlaylist({...playlist_data, tracks: playlist_data.body.tracks})
              })
        }
      } catch(error) {
        alert(error)
      }

      }).catch(function(error) {
        // Handle error
        alert(error)
      });
    }

    return (
      <>
       <FirebaseAuthConsumer>
         {({ isSignedIn, user, providerId }) => {
            if(isSignedIn) { 
             if(!profile){fetchData(user)}
            return (
             <div className={commonstyles.starryNight}>
              {!loading ?
              <Layout
                seo={{title: "Profile"}}
              >
                <ProfileNav 
                  zodiac={profile.zodiac}
                />
                <div className={styles.titleWrapper}>
                  <h1 className={styles.landingTitle}>{generateGreeting(profile.name, profile.zodiac)}</h1>
                </div>
                <div className={styles.horoscopeWrapper}>
                  <div className={styles.horoscope}>
                    {`"${horoscope}"`}
                  </div>
                </div>
                <div className={styles.innerWrapper}>
                  <div className={styles.horoscopeAnalysisWrapper}></div>
                  <div className={styles.playlistWrapper}>
                    <ul>
                    {
                      playlist.tracks 
                    ? playlist.tracks.items.map((track_obj,i) =>{
                        return (
                        <li key={i}>
                          {`${track_obj.track.name} - ${track_obj.track.artists[0].name}`}
                        </li>
                        )
                        }) 
                    : 'Loading playlist...'
                    }
                    </ul>
                  </div>
                </div>
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