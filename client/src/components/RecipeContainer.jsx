import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Recipe from './Recipe';

export default function RecipeContainer ({ recipes }) {
  return (
    <Row
      xs={1}
      md={2}
      className='g-4 mt-auto'
    >
      {recipes && recipes.map(recipe => <Col>
        <Recipe recipe={recipe} />
      </Col>)}
    </Row>
  );
}
