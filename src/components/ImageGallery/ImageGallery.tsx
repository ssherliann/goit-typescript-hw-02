import styles from '../ImageGallery/ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { IPhoto } from '../../Types';

type Props = {
    photos: IPhoto[];
    openModal: (photo: IPhoto) => void;
}

const ImageGallery: React.FC<Props> = ({ photos, openModal }) => {
    return (
        <div className={styles.galleryContainer}>
            <ul className={styles.gallery}>
            {photos.map((photo: IPhoto) => (
                <ImageCard key={photo.id} photo={photo} openModal={openModal} />
            ))}
            </ul>
        </div>
    );
};

export default ImageGallery;
