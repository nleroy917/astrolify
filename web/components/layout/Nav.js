import styles from '../../styles/Nav.module.css';
import Button from '../common/Button';

const Nav = ({ }) => {
    return (
        <>
          <div className={styles.nav}>
            <div className={styles.navList}>
              <div  className={styles.navListItem}>About</div>
              <div className={styles.navListItem}>GitHub</div>
              <div className={styles.navListItem}>
                <Button size="medium">
                    Sign In
                </Button>
              </div>
            </div>
          </div>
        </>
    )
}

export default Nav;