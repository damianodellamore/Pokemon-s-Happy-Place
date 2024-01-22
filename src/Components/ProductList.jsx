import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, ListGroup } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './ProductList.css';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ProductList({ addToFavorites, removeFromFavorites, favoriteItems }) {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon-species/')
      .then(res => res.json())
      .then(data => Promise.all(
        data.results.map(species => 
          fetch(`https://pokeapi.co/api/v2/pokemon/${species.name}`)
            .then(res => res.json())
            .then(pokemonData => ({
              name: capitalize(species.name),
              image: pokemonData.sprites.front_default,
              types: pokemonData.types.map(type => capitalize(type.type.name)),
              abilities: pokemonData.abilities.map(ability => capitalize(ability.ability.name)),
              stats: pokemonData.stats.map(stat => ({ name: capitalize(stat.stat.name), value: stat.base_stat }))
            }))
        )
      ))
      .then(setProducts)
      .catch(err => console.error("Errore nel recupero dei Pokémon:", err));
  }, []);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/item/')
      .then(res => res.json())
      .then(data => Promise.all(
        data.results.map(item =>
          fetch(item.url)
            .then(res => res.json())
            .then(itemDetails => ({
              name: capitalize(item.name),
              image: itemDetails.sprites?.default,
              cost: itemDetails.cost,
              flingPower: itemDetails.fling_power,
              category: capitalize(itemDetails.category.name),
              effect: itemDetails.effect_entries[0]?.short_effect
            }))
        )
      ))
      .then(setItems)
      .catch(err => console.error("Errore nel recupero degli oggetti:", err));
  }, []);

  const isFavorite = productName => favoriteItems.some(item => item.name === productName);

  const handleFavoriteToggle = product => {
    if (isFavorite(product.name)) {
      removeFromFavorites(product.name);
    } else {
      addToFavorites(product);
    }
  };

  const handleRatingChange = (product, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [product.name]: rating,
    }));
  };

  const getRating = productName => ratings[productName] || 0;

  const handleSearchChange = e => setSearchTerm(e.target.value.toLowerCase());

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      <Form className="m-3">
        <Form.Control type="text" placeholder="Cerca Pokémon o Oggetti..." onChange={handleSearchChange} />
      </Form>
      <Row className="m-5">
        {filteredProducts.map(product => (
          <Col xs={12} sm={6} md={4} key={product.name} className="mb-4">
            <Card className="h-100 shadow-sm product-card">
              <Card.Img variant="top" src={product.image || 'https://via.placeholder.com/200?text=No+Image'} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{product.name}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item><b>Types:</b> {product.types.join(', ')}</ListGroup.Item>
                  <ListGroup.Item><b>Abilities:</b> {product.abilities.join(', ')}</ListGroup.Item>
                  <ListGroup.Item>
                    <b>Stats:</b> {product.stats.map(stat => `${stat.name}: ${stat.value}`).join(', ')}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <b>Rating:</b>&nbsp;
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          color={index < getRating(product.name) ? '#ffc107' : '#e4e5e9'}
                          onClick={() => handleRatingChange(product, index + 1)}
                          style={{ cursor: 'pointer' }}
                        />
                      ))}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <Button 
                  variant={isFavorite(product.name) ? "secondary" : "success"}
                  onClick={() => handleFavoriteToggle(product)}
                >
                  {isFavorite(product.name) ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <hr/>
        {filteredItems.map(item => (
          <Col xs={12} sm={6} md={4} key={item.name} className="mb-4">
            <Card className=" ms-0 h-100 shadow-sm item-card">
              <Card.Img variant="top" src={item.image || 'https://via.placeholder.com/200?text=No+Image'} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{item.name}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item><b>Cost:</b> {item.cost}</ListGroup.Item>
                  <ListGroup.Item><b>Category:</b> {item.category}</ListGroup.Item>
                  <ListGroup.Item><b>Effect:</b> {item.effect}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default ProductList;
