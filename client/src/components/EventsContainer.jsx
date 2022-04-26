import React from 'react'
import {Container, CardGroup} from 'react-bootstrap'
import Events from "./Events"

export default function EventsContainer(props) {
  return (
    <CardGroup className='d-inline-flex  mt-xl-4'>
      {props.list  && props.list.map(prop => (
        <Events key={prop.id} user={prop}></Events>
      ))}
    </CardGroup>
  )
}
