import { use, useEffect, useState } from 'react'
import styles from './Portfolio.module.css'

import ClientCard from '../../components/Cards/ClientCard/ClientCard'
import VidCard from '../../components/Cards/VidCard/VidCard'


export default function Portfolio() {
    // Vídeos e clientes buscados na API do Notion
    const [vids, setVids] = useState([])
    const [clients, setClients] = useState([])

    // Largura atual da página
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    // Tags selecionadas para filtrar os vídeos
    const [unwantedTags, setUnwantedTags] = useState(['-10K', '25K', '50K', '100K', 'Main']) // Não Desejadas
    const [vidsTags, setVidsTags] = useState([]) // Desejadas
    const [tagFilter, setTagFilter] = useState() // Filtro de Tag Atual
    
    // Fetch dos dados da API do Notion
    useEffect(() => {
        fetch('/api/notion')
            .then(res => res.json())
            .then(data => {
                // Define "vídeos" como todo registro em Data sem a tag 'Clients'
                setVids(
                    data.filter(d => (d.vidTags.some(tag => tag.name !== 'Clients')))
                )
                // Define "clientes" como todo registro em Data com a tag 'Clients'
                setClients(
                    data.filter(d => (d.vidTags.some(tag => tag.name === 'Clients')))
                )
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

    // Definindo todas as Tags úteis para essa página
    useEffect(() => {
        setVidsTags( () => {
            let todasTags = vids
                .flatMap(v => v.vidTags)
                .map(tag => tag.name)
                .filter(t => !unwantedTags.includes(t))

            return [...new Set(todasTags)]
        })
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

            {/* Seção dos Clientes */}
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

            {/* Seção dos Vídeos */}
            <section className={styles.vidsArea}>
                <header className={styles.vidsController}>
                    {/* Filtros */}
                    <div className={styles.vidsFilter}>
                        <label for="tagFilter">Current Video Filter: </label>

                        <select id="tagFilter" onChange={e => setTagFilter(e.target.value)}>
                            <option value=""> None </option> {/* Valor Padrão */}
                            {/* Valores do Notion */}
                            {vidsTags.map((tag, index) => (
                                <option value={tag} key={index}>
                                    {tag} 
                                </option>
                            ))}
                        </select>
                        
                    </div>

                    <a className={styles.homepageBtn} href='/'>
                        <i className="bi bi-chevron-left"></i>
                        Return to Homepage
                    </a>
                </header>

                {/* Display dos Vídeos */}
                <main className={styles.vidsContainer}>
                    {tagFilter 
                    ? vids
                        .filter(vid => vid.vidTags
                        .some(tag => tag.name === tagFilter))
                        .map((v, index) => (
                            <VidCard video={v} key={index}/>
                        ))
                    : vids
                        .map((v, index) => (
                            <VidCard video={v} key={index} />
                        ))
                    }
                </main>

            </section>
        </main>
    )
}