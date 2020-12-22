import styles from '../styles/Home.module.css';
import starstyles from '../styles/StarStyles.module.css';
import common_styles from '../styles/common.module.css';
import styled from 'styled-components';

import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';
import Button from '../components/common/Button';
import InvertedButton from '../components/common/InvertedButton';

import { useRouter } from 'next/router';

const querystring = require('querystring');
const base_url =  'https://accounts.spotify.com/authorize?'
const payload = {
	client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
	response_type: 'code',
	scope: process.env.NEXT_PUBLIC_SPOTIFY_SCOPE,
	redirect_uri: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URI,
	show_dialog: true
}
const authorize_url = base_url + querystring.stringify(payload)

export default function Home() {
  const router = useRouter()
  return (
    <>
    <div className={styles.starryNight}>
     <Layout
       seo={{title: "Home"}}
     >
    <header>
      <Nav />
    </header>
      <div className={starstyles.nightsky} >
        <div className={starstyles.star} ></div>
        <div className={starstyles.star} ></div>
        <div className={starstyles.star} ></div>
        <div className={starstyles.star} ></div>
        <div className={starstyles.star} ></div>
      </div>
      <div className={styles.landingContainer}>
        <div className={common_styles.centerY}>
          <h1 className={styles.landingText}>Astrolify.io</h1>
          <h4 className={styles.landingSubText}>Music created for you that was written in the stars.</h4>
          <div>
            <Button
              style={{width: '200px', marginLeft: '0'}}
              size="large"
              onClick={() => router.push('getting-started')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
     </Layout>
     </div>
    </>
  )
}