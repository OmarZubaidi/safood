import React from 'react';
import { Card } from 'react-bootstrap';
import omar from '../img/omar.jpeg';

export default function Users (props) {
  return (
    <Card>
      <Card.Img src={omar} className="w-25 mb-4" />
      <Card.ImgOverlay>
        <Card.Title className='text-center mb-4'>{props.user.name}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}
