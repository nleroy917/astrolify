import styles from '../styles/getting-started.module.css';
import styled from 'styled-components';
import commonstyles from '../styles/common.module.css';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Nav from '../components/layout/Nav';
import InvertedButton from '../components/common/InvertedButton';

import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';

const querystring = require('querystring');
const base_url =  'https://accounts.spotify.com/authorize?'
const payload = {
	client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
	response_type: 'code',
	scope: process.env.NEXT_PUBLIC_SPOTIFY_SCOPE,
	redirect_uri: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URI,
	show_dialog: false
}
const authorize_url = base_url + querystring.stringify(payload)

const SpotifyLogo = styled.img`
  height: 20px;
  width: 20px;
`

const GettingStarted = () => {
    const router = useRouter()
    return (
        <>
        <div className={styles.starryNight}>
         <Layout
           seo={{
            title: "Getting Started"
           }}
         >
         <Nav />
          <div className={commonstyles.centerXY} style={{height: '80vh'}}>
            <h1 className={styles.landingText} >Let's make some music...</h1>
            <h4 className={styles.landingSubText} >Create a profile and set up automatic playlist generation or create a one-time playlist.</h4>
            <div className={styles.buttonWrapper}>
            <Button size="large"
              style={{width: '150px', background: '#1bb954', border:'solid white 1px'}}
              onClick={()=>router.push(authorize_url)}
            >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}}>
             <SpotifyLogo src="/Spotify_Icon_RGB_Black.png" />
              Sign Up
             </div>
            </Button>
            <InvertedButton size="large"
              style={{width: '200px'}}
              onClick={()=>router.push('/')}
            >
                One-time playlist
            </InvertedButton>
            </div>
            <p 
              className={styles.textLink}
              onClick={()=>router.push('/sign-in')}
             >
               Already have an account?
            </p>
          </div>
         </Layout>
         </div>
        </>
    )
}

export default GettingStarted;