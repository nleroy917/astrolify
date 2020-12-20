import styles from '../../styles/Nav.module.css';
import Button from '../common/Button';

import { useRouter } from 'next/router'

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