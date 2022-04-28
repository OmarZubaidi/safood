import React from 'react'
import {Container, CardGroup, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Events from "./Events"

export default function EventsContainer(props) {
  return (
    <Row xs={1} md={2} className="g-4 mt-auto" >
      {props.list  && props.list.map(prop => (
        <Col><Events key={prop._id} event={prop}>
        </Events></Col>
        
      ))}
      </Row>
  )
}
