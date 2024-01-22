import React, { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import './MyNavbar.css';

function MyNavbar({ favoriteItems, onShowFavorites }) {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const handleCloseFavorites = () => {
    setShowFavorites(false);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-custom my-3">
        <Navbar.Brand className='text-white ms-5 fs-1' href="#home">Happy Places by Damiano Dell'Amore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className=" me-5 ms-auto">
            <Button onClick={handleShowFavorites} className="button-outline-light">
              <FaHeart />
              <span className="ms-2">Preferiti ({favoriteItems.length})</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Offcanvas per i Preferiti */}
      <Offcanvas show={showFavorites} onHide={handleCloseFavorites} placement="end" className="offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Preferiti</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {favoriteItems.length > 0 ? (
            favoriteItems.map((item, index) => (
              <div key={index} className="favorite-item">
                <img src={item.image} alt={item.name} />
                <p><b>Nome:</b> {item.name}</p>
              </div>
            ))
          ) : (
            <p>La lista dei preferiti è vuota.</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MyNavbar;
