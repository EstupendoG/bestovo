import styles from './VidCard.module.css';

const VidCard = ({video, unwantedTags}) => {

    return(
        <a className={styles.container} href={video.vidLinks.youtube} target='_blanket'>
            <div className={styles.cardImg}>
                <img src={video.vidImg.url} alt={`Video Thumbnail ${video.vidImg.alt}`} className={styles.vidThumb}/>
                <p className={styles.overlayText}>
                    Watch on Youtube 
                    <i className="bi bi-box-arrow-up-right"></i>
                </p>
            </div>

            <div className={styles.cardText}>
                <h5 className={styles.vidTitle}>
                    {video.vidName}
                </h5>
                <div className={styles.tagsContainer}>
                    {video.vidTags.map((tag, index) => (
                        <p className={`${styles.tag} ${styles[tag.color]}`} key={index}>
                            {tag.name}
                        </p>
                    ))}
                </div>
            </div>
        </a>
    )
}

export default VidCard