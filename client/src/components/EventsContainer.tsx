// Package imports
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Local imports
import Events from './Events';
import { IEventsContainerProps } from '../interfaces/Events.interface';

export default function EventsContainer ({ list }: IEventsContainerProps) {
  return (
    <Row
      xs={1}
      md={2}
      id='events-container'
      className='g-4 mt-auto'
    >
      {list.map(event => (
        <Col key={event._id}>
          <Events event={event} />
        </Col>
      ))}
    </Row>
  );
}
