import React from 'react'
import {CardGroup, Container} from 'react-bootstrap'
import Users from './Users'

export default function UsersContainer(props) {
  return (
    <CardGroup className='d-inline-flex justify-content-between align-items-center '>
      {props.list.map(prop => (
        <Users key={prop} user={prop}></Users>
      ))}
    </CardGroup>
  )
}
