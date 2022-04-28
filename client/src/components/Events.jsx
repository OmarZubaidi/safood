// Package imports
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Events ({ event, profile }) {
  return (
    <>
      {event && <Card>
        <Link
          to={`/events/${event._id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Card.Title className='text-center mb-4 bg-warning p-2'>
            {event.type} With {event.members.map((member, i) => i === event.members.length - 1 ? member : `${member}, `)}
          </Card.Title>
          <Card.Text className='d-flex p-3'>
            <div className='me-4'>
              <div className='fs-5 '>
                When:
              </div>
              {event.date.slice(0, 10)} at {event.date.slice(11)}
            </div>
            <div className='d-flex flex-column'>
              <div className='fs-5'>Menu:</div>
              {event.menu.map(meal => <div>{meal.title}</div>)}
            </div>
          </Card.Text>
        </Link>
      </Card>}
    </>
  );
}
