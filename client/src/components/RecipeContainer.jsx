import React from 'react'
import {Card, CardGroup, Row, Col} from 'react-bootstrap'
import Recipe from './Recipe'

export default function RecipeContainer(props) {


  return (<>
    <Row xs={1} md={2} className="g-4">
  
    {props.recipes && props.recipes.map(recipe => (
    <Col>

     <Recipe recipe={recipe}></Recipe>
    </Col>
    ))}
  </Row>
  </>
  )
}
