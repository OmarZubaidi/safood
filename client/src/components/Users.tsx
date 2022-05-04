// Package imports
import React from 'react';
import { Card } from 'react-bootstrap';

// Local imports
// TODO there has to be a better way.
import omar from '../img/omar.jpg';
import blueomar from '../img/blueomar.jpg';
import greenomar from '../img/greenomar.jpg';
import purpleomar from '../img/purpleomar.jpg';
import redomar from '../img/redomar.jpg';
import yellowomar from '../img/yellowomar.jpg';
import {IUserProps} from '../interfaces/User.interface'

export default function Users({ user }: IUserProps) {
  let img;
  switch (user.img) {
    case 'blue':
      img = blueomar;
      break;
    case 'green':
      img = greenomar;
      break;
    case 'purple':
      img = purpleomar;
      break;
    case 'red':
      img = redomar;
      break;
    case 'yellow':
      img = yellowomar;
      break;
    default:
      img = omar;
  }

  return (
    <Card
      className='text-center mb-4'
      style={{ width: '18rem' }}
    >
      <Card.Img src={img} alt='User image' />
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
