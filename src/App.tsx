import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';
import { IPhoto } from './Types';

function App() {
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null);

    const fetchPhotos = async (searchQuery: string, pageNum: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=${pageNum}&query=${searchQuery}`, {
                headers: {
                    Authorization: 'Client-ID OdMg3srnHeX4GNTMtXc1Nsznztm6rubkdkSNNR1mI2E'
                }
            });
            return response.data.results.slice(0, 9) as IPhoto[];
        } catch (error) {
            console.error('Error:', error);
            const err = new Error('Failed to fetch photos');
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newPhotos = await fetchPhotos(query, page);
                setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
            } catch (error) {
                console.log(error)
            }
        };

        if (query !== '') {
            fetchData();
        }
    }, [query, page]);

    const openModal = (photo: IPhoto): void => {
        setSelectedPhoto(photo);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (searchQuery: string): void => {
        setQuery(searchQuery);
        setPage(1);
        setError(null);
        setPhotos([]);
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            <SearchBar onSubmit={handleSubmit} />
            {error ? <ErrorMessage error={error} /> : <ImageGallery photos={photos} openModal={openModal} />}
            {loading && <Loader />}
            {photos.length > 0 && !error && <LoadMoreBtn onClick={handleLoadMore} />}
            {modalIsOpen && selectedPhoto && <ImageModal photo={selectedPhoto} closeModal={closeModal} modalIsOpen={modalIsOpen} />}
        </>
    );
}

export default App;
