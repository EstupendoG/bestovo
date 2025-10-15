import { useEffect, useState } from 'react'
import useNotionApi from '../../hooks/useNotionApi'
import styles from './Portfolio.module.css'

import ClientCard from '../../components/Cards/ClientCard/ClientCard'
import VidCard from '../../components/Cards/VidCard/VidCard'
import Skeleton from '../../components/Skeleton/Skeleton'


export default function Portfolio() {
    // API DO NOTION
    const { vids, clients, isLoading } = useNotionApi()

    // ESTADOS
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    // Tags selecionadas para filtrar os vídeos
    const [unwantedTags, setUnwantedTags] = useState(['-10K', '25K', '50K', '100K', 'Main']) // Não Desejadas
    const vidsTags = vids ? [...new Set(vids
        .flatMap(v => v.vidTags)
        .map(tag => tag.name)
        .filter(t => !unwantedTags.includes(t))
    )] : []
    const [tagFilter, setTagFilter] = useState() // Filtro de Tag Atual



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
                    All my <span className='red-hl'>Projects </span>
                </h1>
            </header>

            {/* Seção dos Clientes */}
            <section className={styles.clientsArea}>
                <h3 className={styles.clientsPresentation}>
                    {/* Muda o texto de acordo com o tamanho da tela */}
                    {windowWidth >= 500 
                        ? 'Some fellas that I already worked with:' 
                        : 'My Main Clients:'
                    }
                </h3>

                <div className={styles.clientsContainer}>
                    <Skeleton isLoading={isLoading} minHeight={50}/>
                    
                    {clients
                        .sort((a, b) => b.clientSubs - a.clientSubs)
                        .slice(0, windowWidth > 950 ? 6 : windowWidth > 700 ? 5 : windowWidth > 500 ? 4 : 3)
                        .map( (c, index) => (
                            <ClientCard name={c.vidName} img={c.vidImg.url} subs={c.clientSubs} url={c.vidLinks.youtube} key={index} />
                        ))
                    }
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

                    {windowWidth >= 650 && (
                        <a className={styles.homepageBtn} href='/'>
                            <i className="bi bi-chevron-left"></i>
                            Return to Homepage
                        </a>
                    )}
                </header>

                {/* Display dos Vídeos */}
                <main className={styles.vidsContainer}>
                    {/* Skeleton */}
                    {[...Array(12)]
                        .map( (_, index) => 
                            <Skeleton isLoading={isLoading} minHeight={150} key={index}/>
                    )}

                    {/* Iterando sobre vídeos de acordo com a tag do filtro */}
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