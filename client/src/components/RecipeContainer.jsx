import React from 'react'
import {Container, Card, CardGroup} from 'react-bootstrap'

export default function RecipeContainer(props) {
  return (<>
    <CardGroup>
    {props.list.map(prop => (

<Card key={prop}>
<Card.Img variant="top" src="" />
<Card.Body>
  <Card.Title>{prop.name}</Card.Title>
  <Card.Text>
    {prop.description}
  </Card.Text>
</Card.Body>
<Card.Footer>
  <small className="text-muted">Prep-time: {prop.minutes} minutes</small>
</Card.Footer>
</Card>
      ))}
  
</CardGroup>
      
  </>
  )
}
