import React, { useState } from 'react';
import DisplayData from './components/DataFetching';
import Navbar from './components/NavBar';

const App = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div>
      <Navbar toggleFavorites={toggleFavorites} showFavorites={showFavorites} />
      <DisplayData sortByFavorites={showFavorites} />
    </div>
  );
};

export default App;
