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
import SentimentChart from "../components/profile/SentimentChart";
import PlaylistRadar from "../components/profile/PlaylistRadar";

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
    const [horoscopeAnalysis, setHoroscopeAnalysis] = useState('');

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
                analyzeHoroscope(horoscope.description)
                  .then(analysis=>{
                    console.log(analysis)
                    setHoroscopeAnalysis(analysis)
                  })
                
              })
            fetchSpotifyData(data.user.spotify_refresh_token, data.playlist.playlist_id)
              .then(spotify_data=>{
                //console.log(spotify_data)
                setPlaylist({
                  ...spotify_data.playlist_data, 
                  tracks: spotify_data.playlist_data.body.tracks,
                  analysis: spotify_data.playlist_data.analysis
                })
                // console.log(spotify_data)
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

                <div className={styles.horoscopeWrapper}>
                  <div className={styles.horoscope}>
                    {`${horoscope.description}`}
                  </div>
                  <div className={styles.compatibility}>
                   <div className={styles.compatibilityItem}>
                    Musical Compatibility: {`${horoscope.compatibility}`}
                   </div>
                   <div className={styles.compatibilityItem}>
                    Musical Peak: {`${horoscope.lucky_time}`}
                   </div>
                  </div>
                </div>
                <div className={styles.dividerWrapper}>
                  <div className={styles.dividingLine}></div>
                </div>
                <div className={styles.signsWrapper}>
                  <div>
                    <img 
                      className={styles.icon}
                      src={`/signs/${profile.zodiac}.svg`}
                    />
                  </div>
                  <div>
                    <img 
                      className={styles.icon}
                      src={`/signs/${horoscope.compatibility}.svg`}
                    />
                  </div>
                </div>
                <div className={styles.innerWrapper}>
                  <div className={styles.horoscopeAnalysisWrapper}>
                    {
                      horoscopeAnalysis && playlist
                    ? <div>
                       <div className={styles.sentimentAnalysisWrapper}>
                        {horoscopeAnalysis.analysis}
                       </div>
                       <div
                         className={styles.sentimentChartWrapper}
                       >
                         <SentimentChart
                           score={(horoscopeAnalysis.sentiment.score + 1)/2 * 100}
                           magnitude={(horoscopeAnalysis.sentiment.magnitude/5*100)}
                         />
                       </div>
                       <div className={styles.genreWrapper}>
                        {
                          playlist.analysis ? 
                          playlist.analysis.genres.map((g,i)=>{
                            return(g)
                          })
                          :<div></div>
                        }
                       </div>
                       <div className={styles.radarWrapper}>
                        <PlaylistRadar
                        />
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