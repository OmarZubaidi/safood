import React from 'react';
import { Card } from "react-bootstrap";

export default function Recipe ({ recipe }) {
  return (
    <>
      <Card key={recipe.title}>
        <Card.Img variant="top" src={recipe.image} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text>
            {recipe.ingredients}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Prep-time: {recipe.readyInMinutes} minutes</small>
        </Card.Footer>
      </Card>
    </>
  );
}
