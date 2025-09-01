import styles from './Skeleton.module.css'

const Skeleton = ({isLoading}) => {
    return (
        <div className={styles.skeleton} style={{ display: isLoading ? 'block' : 'none'}}>

        </div>
    )

}

export default Skeleton