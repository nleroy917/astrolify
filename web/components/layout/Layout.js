import React from 'react';
import SEO from '../seo/SEO';
import Nav from './Nav';

import styles from '../../styles/Layout.module.css';

const Layout = ({ children, seo }) => {
  console.log(seo)
  return(
  <>
    <SEO 
      title={seo.title || "Music From Your Horoscope"}
    />
    <main className={styles.main}>
      { children }
    </main>
  </>
  )
  };

export default Layout;
