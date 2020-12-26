import styles from '../../styles/Playlist.module.css';
import { useState } from 'react';

const Playlist = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <>
         <div className={styles.playlist}
           onClick={()=>setOpen(!open)}
         >
          <div className={styles.innerWrapper}>
            <img 
              src={`${props.track.album.images[0].url}`}
              className={styles.playlistImg}
            />
            <div>
              <div className={styles.trackTitle}>
                {props.track.name}
              </div>
              <div className={styles.trackArtist}>
                {props.track.artists[0].name}
              </div>
            </div>
           </div>
           <div
              style={{display: open ? '' : 'none', height: open ? '30px' : '0px'}}
              className={styles.infoWrapper}
            >
                More info here...
           </div>
         </div>
        </>
    )
}

export default Playlist;