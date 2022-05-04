// Package imports
import React, { useState } from 'react';
import { Card, Alert, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

// Local imports
import { useAuth } from '../context/AuthContext';
import { getUser, getUsers } from '../services/index';
import IQuery from '../interfaces/Query.interface';
import { IUser } from '../interfaces/User.interface';
import ProfileAllergens from './ProfileAllergens';
import ProfileEvent from './ProfileEvent';

export default function Profile () {
  // Authentication and state
  const { currentUser } = useAuth();
  const [error, setError] = useState<string>('');

  // Queries
  const { data: profile, status }: IQuery<IUser> = useQuery(
    'user',
    () => getUser(currentUser)
  );
  const { data: users, status: userStatus }: IQuery<IUser[]> = useQuery(
    'users',
    getUsers
  );

  // Loading and error handling
  if (status === 'loading' || userStatus === 'loading') {
    return <Spinner animation='border' />;
  }
  if (status === 'error' || userStatus === 'error') {
    return <div>{error}</div>;
  }

  return (
    <>
      {profile &&
        <Card style={{ marginTop: '150px' }}>
          <Card.Title>
            <h1 className='text-center mb-4'>
              {profile.name}'s Profile
            </h1>
          </Card.Title>
          {error && <Alert variant='danger'>
            {error}
          </Alert>}
          <Card.Body>
            <div className='d-flex flex-column'>
              <h3>About me</h3>
              {profile.about}
            </div>
            <hr />
            <ProfileAllergens
              profile={profile}
              setError={setError}
            />
            <hr />
            <ProfileEvent
              profile={profile}
              users={users}
              currentUser={currentUser}
              setError={setError}
            />
          </Card.Body>
        </Card>
      }
    </>
  );
}
