import styles from './Footer.module.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Footer = () => {
    return(
        <footer id={styles.footer}>
            <div className={styles.contactsArea}>
                <p>Contact Me</p>
                <div className={styles.container}>
                    <a className={styles.contact}>
                        <i className="bi bi-discord"></i>
                        Discord
                    </a>
                    <a className={styles.contact}>
                        <i className="bi bi-twitter-x"></i>
                        Twitter
                    </a>
                    <a className={styles.contact}>
                        <i className="bi bi-envelope-fill"></i>
                        Gmail
                    </a>
                </div>
            </div>
            <p className={styles.creditsArea}>
                Developed by 
                <span className={styles.github}>
                    EstupendoG
                </span>
            </p>
        </footer>
    )
}

export default Footer