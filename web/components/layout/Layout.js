import React from 'react';
import SEO from '../seo/SEO';
import Nav from './Nav';

import styles from '../../styles/Layout.module.css';

const Layout = (props) => {
  return(
  <>
    <SEO 
      title={props.seo.title || "Music From Your Horoscope"}
    />
    <main>
     <div {...props} className={styles.main}>
      { props.children }
     </div>
    </main>
  </>
  )
  };

export default Layout;
