import styles from './ClientCard.module.css';

const ClientCard = ({ name, img, url, subs }) => {

    const formatSubs = (subs) => {
        return new Intl.NumberFormat('en', {
            notation: 'compact',
            maximumFractionDigits: 1,
        }).format(subs)
    }

    return (
        <a  href={url} 
            target="_blank"
            className= {`
                ${styles.card} 
                ${url === null && styles.disabled}
            `} 
            
        >
            <img src={img} alt={`${name} profile picture`} className={styles.clientImg} />

            <div className={styles.clientInfo}>
                <h4 className={styles.clientName}>{name}</h4>
                <p className={styles.clientSubs}>{formatSubs(subs)} subs</p>
            </div>
        </a>
    );
}

export default ClientCard;