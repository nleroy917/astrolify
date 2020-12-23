import styles from '../../styles/Nav.module.css';
import Button from '../common/Button';

import { useRouter } from 'next/router'

const querystring = require('querystring');
const base_url =  'https://accounts.spotify.com/authorize?'
const payload = {
	client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
	response_type: 'code',
	scope: process.env.NEXT_PUBLIC_SPOTIFY_SCOPE,
	redirect_uri: process.env.NEXT_PUBLIC_SIGNIN_REDIRECT_URI
}
const authorize_url = base_url + querystring.stringify(payload)

const Nav = ({ }) => {
    const sendToSignIn = (e) => {
        e.preventDefault()
        router.push("/sign-in")
      }
    const router = useRouter()
    return (
        <>
          <div className={styles.nav}>
            <div className={styles.navList}>
              <div  className={styles.navListItem}>About</div>
              <div className={styles.navListItem}>GitHub</div>
              <div >
                <Button 
                  size="medium"
                  onClick={sendToSignIn}
                >
                    Sign In
                </Button>
              </div>
            </div>
          </div>
        </>
    )
}

export default Nav;