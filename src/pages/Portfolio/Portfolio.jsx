import { useEffect, useState } from 'react'
import styles from './Portfolio.module.css'

import ClientCard from '../../components/Cards/ClientCard/ClientCard'


export default function Portfolio() {
    const [vids, setVids] = useState([])
    const [clients, setClients] = useState([])

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        fetch('/api/notion')
            .then(res => res.json())
            .then(data => {
                setVids(
                    data.filter(d => (d.vidTags.some(tag => tag.name !== 'Clients')))
                )
                setClients(
                    data.filter(d => (d.vidTags.some(tag => tag.name === 'Clients')))
                )
            })
            .catch(err => console.error('Error reading JSON', err))
    }, [])

    return(
        <main id='mainContainer'>
            <header id="page-titles">
                <h2 className="name-title">
                    best
                    <span className='red-hl'>ovo</span>
                </h2>
                <h1 className="main-title">
                    All my <span className='red-hl'>Projects </span>
                </h1>
            </header>

            <section className={styles.clientsArea}>
                <h3 className={styles.clientsPresentation}>
                    Some fellas that I already worked with:
                </h3>

                <div className={styles.clientsContainer}>
                    {clients
                        .sort((a, b) => b.clientSubs - a.clientSubs)
                        .slice(0, windowWidth > 950 ? 6 : windowWidth > 700 ? 5 : windowWidth > 500 ? 4 : 3)
                        .map( c => (
                            <ClientCard name={c.vidName} img={c.vidImg.url} subs={c.clientSubs} url={c.vidLinks.youtube}/>
                        ))}
                </div>

            </section>
        </main>
    )
}