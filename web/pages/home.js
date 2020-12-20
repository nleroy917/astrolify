import styles from '../styles/Home.module.css';
import starstyles from '../styles/StarStyles.module.css';
import common_styles from '../styles/common.module.css';

import Layout from '../components/layout/Layout';
import Nav from '../components/layout/Nav';
import Button from '../components/common/Button';


export default function Home() {
  
  return (
    <>
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
              size="large"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
     </Layout>
    </>
  )
}