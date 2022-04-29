// Package imports
import { Row, Col } from 'react-bootstrap';

// Local imports
import Events from './Events';

export default function EventsContainer ({ list }) {
  return (
    <Row
      xs={1}
      md={2}
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
