import { useEffect } from 'react'
import styles from './Portfolio.module.css'

export default function Portfolio() {

    useEffect(() => {
        fetch('/api/notion')
            .then(res => res.json())
            .then(data => {
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
        </main>
    )
}