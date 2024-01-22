import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './Preview.css';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Preview({ addToFavorites, removeFromFavorites, favoriteItems }) {
  const [products, setProducts] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#ff80b0'); // Colore iniziale

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => response.json())
      .then(data => {
        const pokemonData = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: capitalize(pokemon.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        setProducts(pokemonData);
      })
      .catch(error => console.error('Errore nella chiamata GET:', error));
  }, []);

  const isFavorite = (pokemonId) => favoriteItems.some(item => item.id === pokemonId);

  const handleFavoriteClick = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  useEffect(() => {
    // Cambia dinamicamente il colore di sfondo ogni 10 secondi in modo alternato
    const interval = setInterval(() => {
      setBackgroundColor(prevColor => (
        prevColor === '#ff80b0' ? '#81f0ea' : '#ff80b0'
      ));
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container className={`preview-container background-animation`} style={{ backgroundColor }}>
      <h1 className="preview-title text-warning">Pokemon Favourite Place</h1>
      <Row>
        {products.map(product => (
          <Col md={4} key={product.id} className="mb-4">
            <Card className="product-card">
              <Card.Body>
                <Card.Img variant="top" src={product.image} className="product-image" />
                <Card.Title>{product.name}</Card.Title>
                <Button 
                  variant="link"
                  onClick={() => handleFavoriteClick(product)}
                  className="favorite-button"
                >
                  {isFavorite(product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Preview;
