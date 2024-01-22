import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#3B4CCA', color: 'white' }}> {/* Colori ispirati a Pokémon */}
      <Container fluid className="py-3 text-center">
        <Row>
          <Col md={4}>
            <h5>Pokédex</h5>
            <p>
              Esplora il Pokédex<br />
              Tipi di Pokémon<br />
              Evoluzioni
            </p>
          </Col>
          <Col md={4}>
            <h5>Risorse per Allenatori</h5>
            <p>
              Guide Strategiche<br />
              Community e Forum<br />
              Eventi e Tornei
            </p>
          </Col>
          <Col md={4}>
            <h5>Social</h5>
            <p>
              Seguici su PokéTwitter<br />
              Unisciti alla PokéCommunity<br />
              #PokémonFan su Instagram
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="text-whitesmall mb-0">
              © 2024 Damiano Dell'Amore, Inc. Tutti i diritti riservati.<br />
              Pokémon e tutti i nomi relativi sono marchi di Nintendo, Creatures, e Game Freak.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
