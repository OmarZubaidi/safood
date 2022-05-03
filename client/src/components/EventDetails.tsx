// Package imports
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

// Local imports
import { getEvent } from '../services/index';
import { Container, Spinner } from 'react-bootstrap';
import RecipeContainer from './RecipeContainer';
import IQuery from '../interfaces/Query.interface';
import { IEvent } from '../interfaces/Events.interface';

export default function EventDetails () {
  const { id } = useParams();
  const { data: event, status }: IQuery<IEvent> = useQuery(
    'event',
    () => getEvent(id!),
    { enabled: !!id }
  );

  // Loading handling
  if (status === 'loading') return <Spinner animation='border' />;

  return (
    <>
    {event &&
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
        {event.menu.length > 0 && <RecipeContainer recipes={event.menu} />}
      </Container>
    }
    </>
  );
}
