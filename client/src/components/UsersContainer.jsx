import React from 'react'
import {CardGroup, Container} from 'react-bootstrap'
import Users from './Users'
import { useAuth } from '../context/AuthContext'

export default function UsersContainer(props) {

  const { currentUser } = useAuth();
  return (
    <CardGroup className='d-inline-flex  mt-xl-4'>
      {props.users && props.users.map(prop => (prop.uid === currentUser.uid ? null : (<Users key={prop.name} user={prop}></Users>)))}
    </CardGroup>
  )
}
