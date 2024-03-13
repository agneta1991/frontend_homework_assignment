import React, {
  useState, useEffect, lazy, Suspense,
} from 'react';
import PropTypes from 'prop-types';
import { createClient } from 'pexels';
import './style.css';

const client = createClient(
  'Cm0QX8g61t18SEMzjVqwsMQGuT6HzpkYe5ikCeNTNmABFfnBaKIeRlU0',
);

const LazyImage = lazy(() => import('./LazyLoad'));

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await client.photos.curated({ page, per_page: 80 });
        setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
      } catch (error) {
        // eslint-disable-next-line
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page]);

  return {
    photos,
    loading,
    page,
    setPage,
  };
};

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteClick = (id) => {
    const isFavorite = favorites.includes(id);

    const updatedFavorites = isFavorite
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return { favorites, handleFavoriteClick };
};

const DisplayData = ({ sortByFavorites }) => {
  const {
    photos, loading, page, setPage,
  } = useFetchPhotos();
  const { favorites, handleFavoriteClick } = useFavorites();

  function capitaliseName(name) {
    const fullName = name.split(' ');
    const capitaliseFullName = fullName.map(
      (fullName) => fullName.charAt(0).toUpperCase() + fullName.slice(1),
    );

    return capitaliseFullName.join(' ');
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
          === document.documentElement.offsetHeight
        && !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, setPage]);

  let renderedPhotos = photos;

  if (sortByFavorites) {
    renderedPhotos = photos.filter((photo) => favorites.includes(photo.id));
    renderedPhotos = renderedPhotos.filter(
      (photo, index, self) => index === self.findIndex((p) => p.id === photo.id),
    );
  }

  return (
    <div className="photo-div">
      <Suspense fallback={<div>Loading...</div>}>
        {renderedPhotos.map((photo, index) => (
          <LazyImage
            key={`photo_${photo.id}_page_${page}_${index}`}
            photo={photo}
            favorites={favorites}
            handleFavoriteClick={handleFavoriteClick}
            capitaliseName={capitaliseName}
          />
        ))}
      </Suspense>
      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

DisplayData.propTypes = {
  sortByFavorites: PropTypes.bool.isRequired,
};

export default DisplayData;
