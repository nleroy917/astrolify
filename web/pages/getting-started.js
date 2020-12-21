import styles from '../styles/getting-started.module.css';
import commonstyles from '../styles/common.module.css';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Nav from '../components/layout/Nav';
import InvertedButton from '../components/common/InvertedButton';

import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';

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
              style={{width: '200px'}}
              onClick={()=>router.push('/sign-up')}
            >
                Sign Up
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