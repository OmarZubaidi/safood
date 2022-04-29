// Package imports
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

// Local imports
import { getEvent } from './service';
import { Container, Spinner } from 'react-bootstrap';
import RecipeContainer from './RecipeContainer';

export default function EventDetails () {
  const { id } = useParams();
  const { data: event, status } = useQuery(
    'event',
    fetchEvent,
    { enabled: !!id }
  );

  // Get event function
  async function fetchEvent () {
    const res = await getEvent(id);
    return res.json();
  }

  // Loading handling
  if (status === 'loading') {
    return <Spinner animation='border' />;
  }

  return (
    <Container>
      <h1 className='bg-warning rounded'>
        {event.type} With {
          event.members.map((member, i) =>
            i === event.members.length - 1
              ? member
              : `${member}, `
          )
        }
      </h1>
      <h2>When: </h2>
      <h3>{event.date.slice(0, 10)} at {event.date.slice(11)}</h3>
      <h2>Menu:</h2>
      <RecipeContainer recipes={event.menu} />
    </Container>
  );
}
