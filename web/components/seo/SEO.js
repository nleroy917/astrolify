import React from 'react';
import Head from 'next/head';

const SEO = ({ title, imageUrl }) => (
  <>
    <Head>
      <html lang="en" />
      <title>{`Astrolify | ${title}`}</title>
      <meta name="description" content="Astrolify is your weekly crafted playlist based on your horoscope. Connect your spotify account and recieve a costum currated playlist using the latest in language processing adn music curration software." />
      
      {/* Open Graph  */}
      <meta property="og:image" content={imageUrl | "/public/android-chrome-512x512.png"} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`Astrolify | ${title}`} />
      <meta property="og:description" content={"Astrolify is your weekly crafted playlist based on your horoscope. Connect your spotify account and recieve a costum currated playlist using the latest in language processing adn music curration software."} />
      <meta property="og:site_name" content={"Astrolify"} />
      <meta property="og:url" content={"https://astrolify.io"} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title"  content={`Astrolify | ${title}`}  />
      <meta property="twitter:description" content="Astrolify is your weekly crafted playlist based on your horoscope. Connect your spotify account and recieve a costum currated playlist using the latest in language processing adn music curration software." />
      <meta property="twitter:image" content={imageUrl | "/public/android-chrome-512x512.png"} />
      <meta property="twitter:url" content={"https://astrolify.io"} />
    </Head>
  </>
);

export default SEO;
