import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './Comments.css';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(data => setComments(data.slice(0, 4)))
      .catch(error => console.error('Error:', error));
  }, []);

  const renderStars = rating => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i < rating ? '#ffc107' : '#e4e5e9'}
        />
      );
    }
    return stars;
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        {comments.map((comment, index) => (
          <Col key={comment.id} md={6} lg={4} xl={3}>
            <Card className="mb-4 comment-card">
              <Card.Body>
                <Card.Title>{comment.name}</Card.Title>
                <Card.Text>{comment.body}</Card.Text>
                <div className="stars">{renderStars(index % 5 + 1)}</div>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Email: {comment.email}</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Comments;
