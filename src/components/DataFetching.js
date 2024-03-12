/* eslint-disable */
import React, { useState, useEffect, lazy, Suspense } from "react";
import { createClient } from "pexels";
import "./style.css";

const client = createClient(
  "4OAmJyKKYPC5TjyMccAlpF7NlE94KeZgGZQ2v3QKZvG4zxicgiEU5jJH"
);

const LazyImage = lazy(() => import("./LazyLoad"));

const Photo = ({ photo, favorites, handleFavoriteClick, capitaliseName }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyImage
      photo={photo}
      favorites={favorites}
      handleFavoriteClick={handleFavoriteClick}
      capitaliseName={capitaliseName}
    />
  </Suspense>
);

const DisplayData = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await client.photos.curated({ page, per_page: 80 });
        setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchPhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

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
        <Photo
          key={photo.id}
          photo={photo}
          favorites={favorites}
          handleFavoriteClick={handleFavoriteClick}
          capitaliseName={capitaliseName}
        />
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default DisplayData;


// eslint-enable
