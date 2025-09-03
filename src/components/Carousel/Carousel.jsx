import { useEffect, useState } from 'react';
import IframePlayer from '../IframePlayer/IframePlayer';
import styles from './Carousel.module.css';

const Carousel = ({videos, itemsToShow = 3}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsNum , setItemsNum] = useState(itemsToShow)

    const changeIndex = (x) => {
        let newIndex = currentIndex + x;

        if (newIndex < 0 ) newIndex = videos.length -1; 
        if (newIndex >= videos.length) newIndex = 0

        setCurrentIndex(newIndex);
    }

    useEffect(() => {
        setItemsNum(itemsToShow)
    }, [itemsToShow])
    
    return (
        <div className={styles.carousel}>
            <button className={styles.arrowBtn} id={styles.prev} onClick={() => changeIndex(-1)}>
                <i className="bi bi-chevron-left"></i>
            </button>

            <div className={styles.container} style={{
                transform: `translateX(-${currentIndex * (100 / itemsNum)}%)`,
            }}>
                {videos.map((vid, index) => (
                    <div className={styles.item} style={{
                        flex: `0 0 calc(100% / ${itemsNum})`,
                    }}>
                        <IframePlayer
                            title={vid.title}
                            url={vid.url + '?rel=0'}
                            key={index}
                        />
                    </div>
                ))}
            </div>

            
            {/* BOTÕES */}
            <button className={styles.arrowBtn} id={styles.next} onClick={() => changeIndex(1)}>
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    );
};

export default Carousel;