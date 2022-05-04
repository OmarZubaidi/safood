// Package imports
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Local imports
import { useAuth } from '../context/AuthContext';
import Users from './Users';
import {IUserContainerProps} from '../interfaces/User.interface'

export default function UsersContainer({ users }: IUserContainerProps) {
  const { currentUser } = useAuth();
  return (
    <Row
      xs={1}
      md={4}
      id='users-container'
      className='g-4 mt-auto'
    >
      {users.map(user => (
        user.uid === currentUser.uid
          ? null
          : <Col key={user.uid}>
            <Users user={user} />
          </Col>
      ))}
    </Row>
  );
}
