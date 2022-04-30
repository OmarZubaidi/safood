// Package import
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';

// Local imports
import { useAuth } from '../context/AuthContext';
import EventsContainer from './EventsContainer';
import RecipeContainer from './RecipeContainer';
import UsersContainer from './UsersContainer';
import { getEvents, getUser, recipeRandom } from '../services';

export default function Dashboard () {
  // Authentication
  const { users, currentUser } = useAuth();

  // Queries
  const { data: profile, status } = useQuery(
    'user',
    () => getUser(currentUser)
  );
  const { data: events, status: eventStatus } = useQuery(
    'events',
    getEvents
  );
  const { data: recipes, status: recipeStatus } = useQuery(
    ['random', profile],
    () => recipeRandom(profile.allergens),
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

  if (status === 'error' || eventStatus === 'error') {
    return <div>error</div>;
  }

  return (
    <>
      <RecipeContainer recipes={recipes} />
      <hr />
      <EventsContainer
        user={profile}
        list={events.filter(event => event.members.includes(profile.name))}
      />
      <hr />
      <UsersContainer users={users} />
    </>
  );
}
