// Package imports
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Alert,
  Form,
  Badge,
  Dropdown,
  Spinner
} from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';

// Local imports
import { useAuth } from '../context/AuthContext';
import {
  addEvent,
  getMenu,
  getUser,
  getUsers,
  updateUserAllergens
} from '../services/index';
import IQuery from '../interfaces/Query.interface';
import { IUser, IUserIdAndAllergens } from '../interfaces/User.interface';
import {IEvent} from '../interfaces/Events.interface';

export default function Profile () {
  // Navigation and authentication
  const { logout, updateProfile, currentUser } = useAuth();
  const navigate = useNavigate();

  // States
  const [type, setType] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [members, setMembers] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);

  // Refs
  const allergenRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  // Queries
  const queryClient = useQueryClient();
  const { data: profile, status }: IQuery<IUser> = useQuery(
    'user',
    () => getUser(currentUser)
  );
  const { data: users, status: userStatus }: IQuery<IUser[]> = useQuery(
    'users',
    getUsers
  );

  // Mutations
  const eventMutation = useMutation((event: IEvent) => addEvent(event));
  const mutation = useMutation(
    (params: IUserIdAndAllergens) => updateUserAllergens(params),
    { onSuccess: () => queryClient.invalidateQueries('user') }
  );

  // Handlers
  async function handleLogout () {
    setError('');
    try {
      await logout();
      updateProfile(null);
      navigate('/login');
    } catch (error) {
      setError('Failed to logout.');
    }
  }

  async function handleAllergenSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const newAllergen = allergenRef.current!.value;
      if (newAllergen.length > 1 && profile) {
        if (!profile.allergens.includes(newAllergen)) mutation.mutate({
          uid: profile.uid,
          allergens: [...profile.allergens, newAllergen]
        });
        allergenRef.current!.value = '';
      }
    } catch (error) {
      if(error instanceof Error) console.error(error);
    }
  }

  async function handleEventSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newAllergens = [...new Set([...allergens, ...profile!.allergens])];
    try {
      const menu = await getMenu(newAllergens);
      eventMutation.mutate({
        type,
        allergens: newAllergens,
        members,
        date: dateRef.current!.value,
        menu
      });
      navigate('/');
    } catch (error) {
      if(error instanceof Error) console.error(error);
    }
  }

  function handleMembers (user: IUser) {
    if (members.length === 0 && profile) {
      members.push(profile.name);
    }
    const newMembers = members;
    if (!members.includes(user.name)) {
      newMembers.push(user.name);
      setMembers(newMembers);
      const newAllergens = [...new Set([...allergens, ...user.allergens])];
      setAllergens(newAllergens);
    }
  }

  // Loading and error handling
  if (status === 'loading' || userStatus === 'loading') {
    return <Spinner animation='border' />;
  }

  if (status === 'error' || userStatus === 'error') {
    return <div>error</div>;
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
          <h3>My allergens</h3>
          <h2>
            {profile.allergens.map(allergen => (
              <Badge
                key={allergen}
                pill
                bg='success'
                className='me-2 p-3 fs-5'
              >
                {allergen}
              </Badge>
            ))}
          </h2>
          <Form onSubmit={handleAllergenSubmit}>
            <Form.Control
              type='text'
              ref={allergenRef}
              required
              id='new-allergen-input'
              style={{ maxWidth: 'fit-content' }}
              placeholder='new allergen'
            />
            <Button
              className='mt-2'
              type='submit'
            >
              Add Allergen
            </Button>
          </Form>
          <hr />
          <h3>Plan a new Party!</h3>
          <Form
            onSubmit={handleEventSubmit}
            className='mt-4'
          >
            <div className='d-flex'>
              <Dropdown>
                <Dropdown.Toggle
                  variant='warning'
                  id='dropdown-type'
                  className='me-2'
                >
                  {type || 'Type'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setType('Lunch')}>
                    Lunch
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setType('Dinner')}>
                    Dinner
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  variant='warning'
                  id='dropdown-users'
                >
                  {'Users'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {(currentUser && users) && users.map((user) => {
                    if (user.uid !== currentUser.uid) return (
                      <Dropdown.Item
                        key={user.uid}
                        onClick={() => handleMembers(user)}
                      >
                        {user.name}
                      </Dropdown.Item>
                    );
                    return '';
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Form.Label className='mt-4'>
              Select a Date!
            </Form.Label>
            <Form.Control
              type='datetime-local'
              ref={dateRef}
              id='date-input'
              style={{ maxWidth: 'fit-content' }}
            />
            <Button
              className='mt-2'
              type='submit'
              id='create-event'
            >
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
      }
      <div className='w-100 text-center mt-2'>
        <Button
          variant='link'
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </>
  );
}
