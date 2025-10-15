import styles from './IframePlayer.module.css'
import Skeleton from '../Skeleton/Skeleton'
import { useState } from 'react'

const IframePlayer = ({url, title}) => {
    
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            <iframe
                src={url}
                title={title}
                frameborder="0" allow="" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className={styles.projectVideo}
                style={{ display: isLoading ? 'none' : 'block'}}
                onLoad={() => (setIsLoading(false))}
            >
            </iframe>

            { isLoading && (
                <Skeleton isLoading={isLoading} minHeight={200}/>
            )}
        </>
    )
}

export default IframePlayer