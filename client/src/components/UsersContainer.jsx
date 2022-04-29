import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Users from './Users';
import { useAuth } from '../context/AuthContext';

export default function UsersContainer (props) {
  const { currentUser } = useAuth();
  return (
    <Row
      xs={1}
      md={2}
      className='g-4 mt-auto'
    >
      {props.users && props.users.map(prop => (
        prop.uid === currentUser.uid
          ? null
          : (<Col>
            <Users
              key={prop.name}
              user={prop}
            />
          </Col>)
      ))}
    </Row>
  );
}
