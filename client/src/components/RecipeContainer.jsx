import React from 'react'
import {Container, Card, CardGroup} from 'react-bootstrap'

export default function RecipeContainer(props) {


  return (<>
    <CardGroup className="mt-4 p-2">
    {props.recipes && props.recipes.map(prop => (

      <Card key={prop.title}>
        <Card.Img variant="top" src="" />
        <Card.Body>
          <Card.Title>{prop.title}</Card.Title>
          <Card.Text>
              {prop.ingredients}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Prep-time: {prop.readyInMinutes} minutes</small>
        </Card.Footer>
      </Card>
    ))}
  </CardGroup>
      
  </>
  )
}
