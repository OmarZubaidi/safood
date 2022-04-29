// Package imports
import React from 'react';
import { Card, Badge } from 'react-bootstrap';

export default function Recipe ({ recipe }) {
  // Clean up ingredients string into unique array
  const ingredientsArray = [...new Set(recipe.ingredients.split(','))];
  let firstOne = ingredientsArray[0];
  ingredientsArray[0] = firstOne[0].toUpperCase() + firstOne.slice(1);

  return (
    <Card key={recipe.title}>
      <Card.Img
        variant='top'
        src={recipe.image}
      />
      <Card.Body>
        <Card.Title>
          {recipe.title}
        </Card.Title>
        <Card.Text style={{ minHeight: '50px' }}>
          {ingredientsArray.map((ingredient, i) => {
            let divider = '';
            if (i < ingredientsArray.length - 1) divider = ', ';
            else divider = '.';
            return <span key={i}>{
              ingredient + divider
            }</span>;
          })}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>
          Prep-time: {recipe.readyInMinutes} minutes
        </small>
        {Object.keys(recipe).map(key => {
          if (recipe[key] === 'True')
            return <Badge
              key={key}
              bg='success'
              className='mx-1 p-2'
            >
              {key}
            </Badge>;
          return '';
        })}
      </Card.Footer>
    </Card>
  );
}
