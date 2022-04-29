// Package imports
import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Local imports
import Events from './Events';

export default function EventsContainer (props) {
  return (
    <Row
      xs={1}
      md={2}
      className='g-4 mt-auto'
    >
      {props.list && props.list.map(prop => (
        <Col>
          <Events
            key={prop._id}
            event={prop}
          />
        </Col>
      ))}
    </Row>
  );
}
