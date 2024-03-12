/* eslint-disable */

import React, { useState, useEffect } from "react";
import { createClient } from "pexels";
import "./style.css";

const client = createClient(
  "4OAmJyKKYPC5TjyMccAlpF7NlE94KeZgGZQ2v3QKZvG4zxicgiEU5jJH"
);

const DisplayData = () => {
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await client.photos.curated({ page: 1, per_page: 80 });
        setPhotos(response.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleFavoriteClick = (id) => {
    const isFavorite = favorites.includes(id);

    const updatedFavorites = isFavorite
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  function capitaliseName(name) {
    const fullName = name.split(" ");
    const capitaliseFullName = fullName.map(
      (fullName) => fullName.charAt(0).toUpperCase() + fullName.slice(1)
    );

    return capitaliseFullName.join(" ");
  }

  return (
    <div className="photo-div">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className={`individual-photo-div ${
            favorites.includes(photo.id) ? "favored" : ""
          }`}
        >
          <img
            className="fetched-photo"
            src={photo.src.medium}
            alt={photo.alt}
          />
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
      ))}
    </div>
  );
};

export default DisplayData;
// eslint-enable
