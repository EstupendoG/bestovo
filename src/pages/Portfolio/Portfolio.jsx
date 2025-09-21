import { useEffect, useState } from 'react'
import styles from './Portfolio.module.css'

import ClientCard from '../../components/Cards/ClientCard/ClientCard'


export default function Portfolio() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/api/notion')
            .then(res => res.json())
            .then(data => {
                setData(data)
                console.log(data)
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
                    {data.filter(d => d.vidTags.some(tag => tag.name === 'Clients')).map(c => (
                        <ClientCard name={c.vidName} img={vidImg.url !== null ? vidImg.url : 'https://www.svgrepo.com/show/379925/alert-error.svg'} subs='420k' url={vidLinks.youtube}/>
                    ))}
                </div>

            </section>
        </main>
    )
}