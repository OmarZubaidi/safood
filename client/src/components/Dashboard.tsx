// Package import
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';
import React from 'react';

// Local imports
import { useAuth } from '../context/AuthContext';
import EventsContainer from './EventsContainer';
import RecipeContainer from './RecipeContainer';
import UsersContainer from './UsersContainer';
import { getEvents, getUser, recipeRandom } from '../services/index';
import IQuery from '../interfaces/Query.interface';
import { IEvent } from '../interfaces/Events.interface';
import { IRecipe } from '../interfaces/Recipe.interface';
import { IUser } from '../interfaces/User.interface';

export default function Dashboard () {

  // Authentication
  const { users, currentUser } = useAuth();

  // Queries
  const { data: profile, status }: IQuery<IUser> = useQuery(
    'user',
    () => getUser(currentUser)
  );
  const { data: events, status: eventStatus }: IQuery<IEvent[]> = useQuery(
    'events',
    getEvents
  );

  const { data: recipes, status: recipeStatus }: IQuery<IRecipe[]> = useQuery(
    ['random', profile],
    // I think this is what's re-fetching recipes
    () => (profile && recipeRandom(profile.allergens)),
    { enabled: !!profile }
  );

  // Loading and error handling
  if (
    status === 'loading'
    || eventStatus === 'loading'
    || recipeStatus === 'idle'
    || recipeStatus === 'loading'
  ) {
    return <Spinner animation='border' />;
  }
  if (status === 'error' || eventStatus === 'error') return <div>error</div>;

  return (
    <>
      {recipes && <RecipeContainer recipes={recipes} />}
      <hr />
      {(events && profile) && <EventsContainer
        user={profile}
        list={events.filter((event: IEvent) => event.members.includes(profile.name))}
        />
      }
      <hr />
      {users && <UsersContainer users={users} />}

    </>
  );
}
