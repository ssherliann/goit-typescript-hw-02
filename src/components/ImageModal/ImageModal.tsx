import Modal from 'react-modal';
import styles from './ImageModal.module.css';
import { IPhoto } from '../../Types';

type Props = {
    photo: IPhoto;
    closeModal: () => void;
    modalIsOpen: boolean;
}

const customStyles: Modal.Styles = {
    content: {
        top: '10%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -10%)',
        maxHeight: '90vh',
    },
};

Modal.setAppElement('#root');

const ImageModal: React.FC<Props> = ({ photo, closeModal, modalIsOpen }) => {
    const { urls, description, likes, created_at } = photo;

    const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
            <div>
                <img src={urls.regular} className={styles.modalImage} alt={description} />
                <p>{description}</p>
                <p>Likes: {likes}</p>
                <p>Created at: {formattedDate}</p>
            </div>
        </Modal>
    );
}

export default ImageModal;
