import React from 'react';
import { Card, Badge } from "react-bootstrap";

export default function Recipe ({ recipe }) {
  return (
    <>
      <Card key={recipe.title}>
        <Card.Img variant="top" src={recipe.image} />
        <Card.Body>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text style={{ minHeight: "50px" }}>
            {recipe.ingredients}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Prep-time: {recipe.readyInMinutes} minutes</small>
          {Object.keys(recipe).map((key, index) => {
            if (recipe[key] === "True") return <Badge bg="success" className="mx-1 p-2">{key}</Badge>;
          })}
        </Card.Footer>
      </Card>
    </>
  );
}
