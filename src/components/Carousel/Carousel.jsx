import { useEffect, useState } from 'react';
import IframePlayer from '../IframePlayer/IframePlayer';
import styles from './Carousel.module.css';

const Carousel = ({videos, itemToShow = 2}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsNum , setItemsToShow] = useState(itemToShow)

    const changeIndex = (x) => {
        let newIndex = currentIndex + x;

        if (newIndex < 0 ) newIndex = videos.length -1; 
        if (newIndex >= videos.length) newIndex = 0

        setCurrentIndex(newIndex);
    }
    
    return (
        <div className={styles.carousel}>

            <div className={styles.container} style={{
                transform: `translateX(-${currentIndex * (100 / itemsNum)}%)`,
            }}>
                {videos.map((vid, index) => (
                    <div className={styles.item} style={{
                        minWidth: `calc(100% / ${itemToShow})`,
                    }}>
                        <IframePlayer
                            title={vid.title}
                            url={vid.url}
                            key={index}
                        />
                    </div>
                ))}
            </div>

            
            {/* BOTÕES */}
            <button className={styles.arrowBtn} id={styles.prev} onClick={() => changeIndex(-1)}>
                <i className="bi bi-chevron-left"></i>
            </button>
            <button className={styles.arrowBtn} id={styles.next} onClick={() => changeIndex(1)}>
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    );
};

export default Carousel;