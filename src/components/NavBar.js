import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';

const Navbar = ({ toggleFavorites, showFavorites }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img className="pexel-logo" src={logo} alt="Logo" />
      </div>
      <div className="buttons">
        <button
          className="favorite"
          id="back-to-top"
          type="button"
          onClick={scrollToTop}
        >
          Back to Top
        </button>
        <button
          className="favorite"
          id="show-fav"
          type="button"
          onClick={toggleFavorites}
        >
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  toggleFavorites: PropTypes.func.isRequired,
  showFavorites: PropTypes.bool.isRequired,
};

export default Navbar;
