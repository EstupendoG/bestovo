import { useEffect, useState } from 'react'
import styles from './Portfolio.module.css'

import ClientCard from '../../components/Cards/ClientCard/ClientCard'


export default function Portfolio() {
    // Vídeos e clientes buscados na API do Notion
    const [vids, setVids] = useState([])
    const [clients, setClients] = useState([])

    // Largura atual da página
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    // Tags selecionadas para filtrar os vídeos
    const [vidsTags, setVidsTags] = useState([])
    
    // Fetch dos dados da API do Notion
    useEffect(() => {
        fetch('/api/notion')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setVids(
                    data.filter(d => (d.vidTags.some(tag => tag.name !== 'Clients')))
                )
                setClients(
                    data.filter(d => (d.vidTags.some(tag => tag.name === 'Clients')))
                )
                console.log(vids)
                console.log(clients)
            })
            .catch(err => console.error('Error reading JSON', err))
    }, [])

    // Pegando a largura da janela para elementos responsivos
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Definindo todas as Tags para essa página
    useEffect(() => {
        setVidsTags( () => {
            let todasTags = vids
                .flatMap(v => v.vidTags)
                .map(tag => tag.name)
                .filter(t => !['-10K', '25K', '50K', '100K', 'Main'].includes(t))

            return [...new Set(todasTags)]
        })
        console.log(vidsTags)
    }, [vids])


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
                        .map( (c, index) => (
                            <ClientCard name={c.vidName} img={c.vidImg.url} subs={c.clientSubs} url={c.vidLinks.youtube} key={index} />
                        ))}
                </div>

            </section>

            <section className={styles.vidsArea}>
                <div className={styles.vidsController}>
                    <div className={styles.vidsFilter}>
                        <p></p>
                        <select name="" id="">

                        </select>
                    </div>
                </div>
            </section>
        </main>
    )
}