import React from 'react';
import SEO from '../seo/SEO';
import Nav from './Nav';

import styles from '../../styles/Layout.module.css';

const Layout = ({ children, seo }) => (
  <>
    <SEO 
      title={seo.title}
    />
    <header>
      <Nav />
    </header>
    <main className={styles.main}>
      { children }
    </main>
  </>
);

export default Layout;
