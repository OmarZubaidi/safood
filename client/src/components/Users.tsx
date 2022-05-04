// Package imports
import React from 'react';
import { Card } from 'react-bootstrap';

// Local imports
import {IUserProps} from '../interfaces/User.interface'
import omar from '../img/omar.jpg';
import blueOmar from '../img/blueOmar.jpg';
import greenOmar from '../img/greenOmar.jpg';
import purpleOmar from '../img/purpleOmar.jpg';
import redOmar from '../img/redOmar.jpg';
import yellowOmar from '../img/yellowOmar.jpg';

export default function Users({ user }: IUserProps) {
  let img;
  switch (user.img) {
    case 'blue':
      img = blueOmar;
      break;
    case 'green':
      img = greenOmar;
      break;
    case 'purple':
      img = purpleOmar;
      break;
    case 'red':
      img = redOmar;
      break;
    case 'yellow':
      img = yellowOmar;
      break;
    default:
      img = omar;
  }

  return (
    <Card
      className='text-center mb-4'
      style={{ width: '18rem' }}
    >
      <Card.Img
        src={img}
        alt='User image'
      />
      <Card.Header className='text-center mb-4 fs-3'>
        {user.name}
      </Card.Header>
      <Card.Title className='text-center'>
        About me
      </Card.Title>
      <Card.Body>
        {user.about}
      </Card.Body>
    </Card>
  );
}
