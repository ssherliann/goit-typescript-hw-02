import styles from '../LoadMoreBtn/LoadMoreBtn.module.css';

type Props = {
    onClick: () => void;
}

const LoadMoreBtn: React.FC<Props> = ({ onClick }) => {
    return (
        <div className={styles.loadMoreContainer}>
            <button onClick={onClick} className={styles.loadMoreButton}>Load more</button>
        </div>
    );
}

export default LoadMoreBtn; 
