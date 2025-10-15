import { useEffect, useState } from 'react'
import useNotionApi from '../../hooks/useNotionApi'
import styles from './Homepage.module.css'


import Carousel from '../../components/Carousel/Carousel'

import bestovoPic from '../../assets/img/bestovo.png'

export default function Homepage() {
    // API DO NOTION
    const { vids, isLoading } = useNotionApi()

    // ESTADOS
    // Vídeos com a tag Main
    const mainVideos = vids ? vids.filter(v =>
        v.vidTags.some(tag => tag.name === 'Main')
    ) : []
    // Iframe dos vídeos com a tag Main
    const iframeVideos = mainVideos.map(vid => (
            {
                title: vid.vidName,
                url: vid.vidLinks.iframe,
            }
        ))

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)



    // EFFECTS
    // Pegando a largura da janela
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])



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
                        I’m a video editor with experience turning ideas into dynamic, clear, and engaging content. Specializing in YouTube, I create everything from fast-paced gaming edits to educational and entertainment videos, with attention to pacing, sound effects, and visual storytelling.
                    </p>
                    <p className={styles.aboutText}>
                        Passionate about creativity and technology, I strive to deliver projects that stand out and captivate audiences while maintaining quality and meeting deadlines. Outside of editing, I enjoy exploring new trends, expanding my technical skills, and refining every detail of my work.
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

                <div className={styles.projectCarousel}>
                    <Carousel videos={iframeVideos} 
                        itemsToShow={
                            windowWidth < 900 ? 1 :
                            windowWidth < 1200 ? 2 :
                            (3)
                        } 
                    />
                </div>

                <a className={styles.portfolioBtn} href="#/portfolio">
                    See my Portfolio
                    <i className="bi bi-chevron-right"></i>
                </a>
            </article>


        </main>
    )
}