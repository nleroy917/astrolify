import styles from '../styles/Home.module.css';
import starstyles from '../styles/StarStyles.module.css';
import commonstyles from '../styles/common.module.css';
import styled from 'styled-components';

import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';
import Button from '../components/common/Button';
import InvertedButton from '../components/common/InvertedButton';

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  return (
    <>
    <div className={commonstyles.starryNight}>
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
        <div className={starstyles.star} ></div>
      </div>
      <div className={styles.landingContainer}>
        <div className={commonstyles.centerY}>
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
      <footer className={styles.footer}>
        <div>
          Astrolify v0.0.1
        </div>
        <div>
         <span>
          <p
            className={styles.textLink}
            onClick={()=>router.push('https://nathanleroy.io')}
          >
            Created by Nathan LeRoy
          </p>
          </span>
        </div>
        <div>
          <p 
            style={{margin: '0px'}}
            className={styles.textLink}
            onClick={()=>router.push('https://github.com/NLeRoy917/astrolify/issues/new')}
          >
            Report an issue
          </p>
        </div>
      </footer>
     </Layout>
     </div>
    </>
  )
}