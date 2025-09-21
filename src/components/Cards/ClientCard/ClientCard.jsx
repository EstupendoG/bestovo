import styles from './ClientCard.module.css';

const ClientCard = ({ name, img, url, subs }) => {
    return (
        <a className={styles.card} href={url} target="_blank">
            <img src={img} alt={`${name} profile picture`} className={styles.clientImg} />

            <div className={styles.clientInfo}>
                <h4 className={styles.clientName}>{name}</h4>
                <p className={styles.clientSubs}>{subs} subs</p>
            </div>
        </a>
    );
}

export default ClientCard;