import styles from './Skeleton.module.css'

const Skeleton = ({isLoading , minHeight}) => {
    if(isLoading){
        return(
            <div 
                className={styles.skeleton} 
                style={
                    {minHeight: `${minHeight}px`}
                } > 
            </div>

        )
    }

}

export default Skeleton