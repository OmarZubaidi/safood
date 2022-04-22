import React from 'react'
import {Container, CardGroup} from 'react-bootstrap'
import Events from "./Events"

export default function EventsContainer(props) {
  return (
    <CardGroup className='d-inline-flex justify-content-between align-items-center mt-xl-4'>
      {/* {props.list.map(prop => (
        <Events key={prop.id} user={prop}></Events>
      ))} */}
    </CardGroup>
  )
}
