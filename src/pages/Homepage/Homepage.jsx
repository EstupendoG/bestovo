import { useState } from 'react'
import Skeleton from '../../components/Skeleton/Skeleton'
import IframePlayer from '../../components/IframePlayer/IframePlayer'
import bestovoPic from '../../assets/img/bestovo.png'
import styles from './Homepage.module.css'

export default function Homepage() {

    return(
        <main id='mainContainer'>

            <header id="page-titles">
                <h2 className="name-title">
                    best
                    <span className='red-hl'>ovo</span>
                </h2>
                <h1 className="main-title">
                    HELPING YOUTUBERS <span className='red-hl'>BOOST QUALITY </span> & <span className="red-hl">WATCHTIME </span> WITH SKILLED <span className="red-hl">EDITING</span>
                </h1>
            </header>

            <article className={styles.aboutContainer}>
                <img src={bestovoPic} alt="A picture of Bestovo, a japanese guy." className={styles.aboutImg} />

                <h3 className={styles.aboutTitle}>
                    About <span className="red-hl">Me</span>
                </h3>
                
                <aside className={styles.aboutContents}>

                    <p className={styles.aboutText}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam adipisci ad labore dolores tempore, at iusto itaque nesciunt molestias quas neque officiis reiciendis, molestiae dolorem. Aut sit, reiciendis beatae eligendi voluptatum, quo ex doloribus odio, eius consequuntur impedit debitis commodi!
                    </p>
                    <p className={styles.aboutText}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis distinctio corrupti animi explicabo porro. Aliquam doloribus numquam quam nam necessitatibus eum voluptatibus itaque! Laudantium beatae molestias, ea itaque nihil amet provident. Velit facilis voluptatum voluptatem accusantium, quam architecto? Suscipit, consequuntur!
                    </p>

                    <div className={styles.contactContainer}>
                        <a href="https://discord.com/users/451961486458355723" className={styles.contact} target='_blank'>
                            <i className="bi bi-discord"></i>
                            Discord
                        </a>
                        <a href='https://twitter.com/AllanBestovo123' className={styles.contact} target='_blank'>
                            <i className="bi bi-twitter-x"></i>
                            Twitter
                        </a>
                        <a href='mailto:business@allanediting.com.br' className={styles.contact} target='_blank'>
                            <i className="bi bi-envelope-fill"></i>
                            Gmail
                        </a>
                    </div>
                </aside>
            </article>

            <article className={styles.projectContainer}>
                <h3 className={styles.projTitle}>
                    Main <span className="red-hl">Projects</span>
                </h3>

                <div className={styles.projectDisplay}>
                    <IframePlayer url={'https://www.youtube.com/embed/Co7t6NxsW-4?si=phbhNZb99Hp_5grb'} title={"Sure it's a calming notion"} />
                    <IframePlayer url={'https://www.youtube.com/embed/Co7t6NxsW-4?si=phbhNZb99Hp_5grb'} title={"Perpetual in Motion"} />
                    <IframePlayer url={'https://www.youtube.com/embed/Co7t6NxsW-4?si=phbhNZb99Hp_5grb'} title={"But it's a lie"} />
                </div>

                <a className={styles.portfolioBtn} href="#/portfolio">
                    See my Portfolio
                    <i className="bi bi-chevron-right"></i>
                </a>
            </article>


        </main>
    )
}