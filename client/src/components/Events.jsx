import React, { useRef, useState } from 'react';
import { Card, Form, Button, Dropdown, Navbar, Container, Nav } from 'react-bootstrap';

export default function Events (props) {
  return (
    <>
      {props.user && <Card>
        <Card.Title className='text-center mb-4'>{props.user.date}</Card.Title>
        <Card.Text>
          {props.user.members}, {props.user.allergens}, {props.user.type}
        </Card.Text>
      </Card>}
    </>
  );
}
