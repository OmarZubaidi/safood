import React from 'react';
import { Card } from 'react-bootstrap';
import omar from '../img/omar.jpeg';

export default function Users ({ user }) {
  return (
    <Card className="text-center mb-4" style={{ width: '18rem' }}>
      {<Card.Img src={omar} alt={user.img} />}
      <Card.Header className='text-center mb-4 fs-3'>{user.name}</Card.Header>
      <Card.Title className="text-center">About me:</Card.Title>
      <Card.Body>
        {user.aboutMe || `Hi my name is ${user.name}`}
      </Card.Body>
    </Card>
  );
}
