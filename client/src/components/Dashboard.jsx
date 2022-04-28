// Package import
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Spinner } from 'react-bootstrap';

// Local imports
import { useAuth } from '../context/AuthContext';
import EventsContainer from './EventsContainer';
import RecipeContainer from './RecipeContainer';
import UsersContainer from './UsersContainer';
import { getEvents, getUser, recipeRandom } from './service';

export default function Dashboard () {
  // Authentication
  const { users, currentUser } = useAuth();

  // Get user function
  async function fetchUser () {
    const res = await getUser(currentUser);
    return res.json();
  }

  // Get random recipes function
  async function getRandom () {
    const res = await recipeRandom(profile.allergens);
    return res.json();
  }

  // Get events function
  async function fetchEvents () {
    const res = await getEvents();
    return res.json();
  }

  // Queries
  const { data: profile, status } = useQuery('user', fetchUser);
  const { data: events, status: eventStatus } = useQuery('events', fetchEvents);
  const { data: recipes, status: recipeStatus } = useQuery(['random', profile], getRandom, {
    enabled: !!profile
  });

  const mockEvents = [{ name: 'dinner', time: 'tomorrow', guests: ['paul', 'mary'] }, { name: 'dinner', time: 'tomorrow', guests: ['paul', 'mary'] }];

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
