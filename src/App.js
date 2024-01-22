import React, { useState } from 'react';
import MyNavbar from './Components/MyNavbar';
import Preview from './Components/Preview';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = product => {
    setFavorites(currentFavorites => {
      const found = currentFavorites.some(item => item.name === product.name);
      if (!found) {
        return [...currentFavorites, product];
      }
      return currentFavorites;
    });
  };

  const removeFromFavorites = productName => {
    setFavorites(currentFavorites => 
      currentFavorites.filter(item => item.name !== productName)
    );
  };

  return (
    <div className="app" id='app'>
      <MyNavbar
        favoriteItems={favorites}
      />
      <Preview
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        favoriteItems={favorites}
      />
      <ProductList
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        favoriteItems={favorites}
      />
      <Footer />
    </div>
  );
}

export default App;
