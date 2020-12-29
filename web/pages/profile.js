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
import { fetchHoroscope, analyzeHoroscope } from '../utils/zodiac';
import { generateGreeting} from '../config/greetings';
import { fetchSpotifyData } from '../utils/spotify';
import Playlist from "../components/profile/Playlist";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const now = new Date()
const dayOfWeek = days[ now.getDay() ];
const currentMonth = months[ now.getMonth() ];

const Profile = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [horoscope, setHoroscope] = useState('')
    const [horoscopeAnalysis, setHoroscopeAnalysis] = useState(null);

    const fetchData = async (user) => {
      firebase.auth().currentUser.getIdToken(true).then(async function(idToken) {
        // Send token to api for verification and data fetching
        let hdrs = {
          'identity_token': idToken
        }
        try {
          // call server to get user's profile
          let res = await axios.get(`${API_BASE}/users/${user.uid}`, {headers: hdrs})

          // if sucess - procceed - this
          // is a goddamn mess I know -
          // it's not my fault javascript is just
          // so ugly.
          if(res.status === 200) {
            let data = res.data
            setProfile(data.user)
            setPlaylist(data.playlist)
            fetchHoroscope(data.user.zodiac)
              .then(horoscope=>{
                setHoroscope(horoscope)
                analyzeHoroscope(horoscope)
                  .then(analysis=>{
                    setHoroscopeAnalysis(analysis)
                  })
                
              })
            fetchSpotifyData(data.user.spotify_refresh_token, data.playlist.playlist_id)
              .then(playlist_data=>{
                console.log(playlist_data.body.tracks)
                setPlaylist({...playlist_data, tracks: playlist_data.body.tracks})
              })
            setLoading(false)
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
                <h1 className={styles.landingTitle}>{`${dayOfWeek} - ${currentMonth} ${now.getDate()}, ${now.getFullYear()}`}</h1>
                <div className={styles.signWrapper}>
                  <div className={styles.iconWrapper}>
                    <img className={styles.icon} src={`/signs/${profile.zodiac}.svg`} />
                  </div>
                  <h2 className={styles.zodiac}>{`${profile.zodiac.charAt(0).toUpperCase() + profile.zodiac.slice(1)}`}</h2>
                </div>
                </div>
                <div className={styles.horoscopeWrapper}>
                  <div className={styles.horoscope}>
                    {`"${horoscope}"`}
                  </div>
                </div>
                <div className={styles.innerWrapper}>
                  <div className={styles.horoscopeAnalysisWrapper}>
                    {
                      horoscopeAnalysis
                    ? <div>
                       <div>
                        {horoscopeAnalysis.analysis}
                       </div>
                       <h4 style={{marginBottom: '10px', marginTop: '20px'}}>Sentiment Values:</h4>
                       <div>
                        {`Score: ${Math.round(horoscopeAnalysis.sentiment.score*100)/100}`}
                       </div>
                       <div>
                        {`Magnitude: ${Math.round(horoscopeAnalysis.sentiment.magnitude*100)/100}`}
                       </div>
                       <h4 style={{marginBottom: '10px', marginTop: '20px'}}>Found Entities:</h4>
                       <div>
                        <ul>
                         {horoscopeAnalysis.entities.map((entity, i)=>{
                           return(
                            <li>{entity.charAt(0).toUpperCase() + entity.slice(1)}</li>
                           )
                           })
                          }
                         </ul>
                       </div>
                      </div>
                    : <div></div>
                    }
                  </div>
                  <div className={styles.playlistWrapper}>
                  <div className={styles.playlistInnerWrapper}>
                    {
                      playlist.tracks 
                    ? playlist.tracks.items.map((track_obj,i) =>{
                        return (
                         <Playlist 
                           track={track_obj.track}
                           key={i}
                         />
                        )
                        }) 
                    : 'Loading playlist...'
                    }
                    </div>
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