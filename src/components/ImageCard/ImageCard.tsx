import styles from './ImageCard.module.css';

interface PhotoModal {
    photo: {
        urls: {
            small: string;
        };
    };
    openModal: (photo: any) => void; 
}

const ImageCard: React.FC<PhotoModal> = ({ photo, openModal }) => {
    const { urls } = photo;

    return (
        <div className={styles.imageCard}>
            <img src={urls.small} alt="" className={styles.image} onClick={() => openModal(photo)}/>
        </div>
    );
};

export default ImageCard;


