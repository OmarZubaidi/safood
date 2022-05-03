// Package imports
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Local imports
import Recipe from './Recipe';
import { IRecipeContainerProps } from '../interfaces/Recipe.interface';

export default function RecipeContainer ({ recipes }: IRecipeContainerProps) {
  return (
    <Row
      xs={1}
      md={2}
      className='g-4 mt-auto'
    >
      {recipes && recipes.map((recipe, i) => (
        <Col key={recipe.id} id={`recipe-${i}`}>
          <Recipe recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}
