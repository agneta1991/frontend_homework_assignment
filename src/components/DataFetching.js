/* eslint-disable */
import React, { useState, useEffect } from "react";
import { createClient } from "pexels";
import "./style.css";

const client = createClient(
  "4OAmJyKKYPC5TjyMccAlpF7NlE94KeZgGZQ2v3QKZvG4zxicgiEU5jJH"
);

const DisplayData = () => {
  const [photos, setPhotos] = useState([]);

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

  function capitaliseName(name) {
    const fullName = name.split(" ");
    const capitaliseFullName = fullName.map((fullName) => {
      return fullName.charAt(0).toUpperCase() + fullName.slice(1);
    });

    return capitaliseFullName.join(" ");
  }

  return (
    <div class="photo-div">
      {photos.map((photo) => (
        <div key={photo.id} class="individual-photo-div">
          <img class="fetched-photo" src={photo.src.medium} alt={photo.alt} />
          <div class="overlay">
            <p class="image-name">"{capitaliseName(photo.alt)}"</p>
            <span></span>
            <p class="photographer">{capitaliseName(photo.photographer)}</p>

            <button>Favorite</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayData;
// eslint-enable
