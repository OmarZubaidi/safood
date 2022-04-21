import React from 'react'
import {Container} from 'react-bootstrap'


export default function EventsContainer(props) {
  return (
    <Container className='d-inline-flex justify-content-around '>
      {props.list.map(prop => (
        <li key={prop}>{prop.name}</li>
      ))}
    </Container>
  )
}
