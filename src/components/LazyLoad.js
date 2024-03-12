import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const LazyImage = ({
  photo,
  favorites,
  handleFavoriteClick,
  capitaliseName,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = photo.src.large;
  }, [photo.src.large]);

  return (
    <div
      key={photo.id}
      className={`individual-photo-div ${
        favorites.includes(photo.id) ? 'favored' : ''
      }`}
    >
      {!imageLoaded && (
        <img
          className="fetched-photo-placeholder"
          src={photo.src.tiny}
          alt={photo.alt}
        />
      )}
      {imageLoaded && (
        <img className="fetched-photo" src={photo.src.large} alt={photo.alt} />
      )}
      <div className="overlay">
        <p className="image-name">{capitaliseName(photo.alt)}</p>
        <span />
        <p className="photographer">{capitaliseName(photo.photographer)}</p>

        <button
          type="submit"
          className="favorite"
          onClick={() => handleFavoriteClick(photo.id)}
        >
          Favorite
        </button>
      </div>
    </div>
  );
};

LazyImage.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.shape({
      tiny: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
    }).isRequired,
    alt: PropTypes.string.isRequired,
    photographer: PropTypes.string.isRequired,
  }).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
  capitaliseName: PropTypes.func.isRequired,
};

export default LazyImage;
