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
} from './service';

export default function Profile () {
  // Navigation and authentication
  const { logout, updateProfile, currentUser } = useAuth();
  const navigate = useNavigate();

  // States
  const [type, setType] = useState();
  const [error, setError] = useState('');
  const [members, setMembers] = useState([]);
  const [allergens, setAllergens] = useState([]);

  // Refs
  const allergenRef = useRef();
  const dateRef = useRef();

  // Functions
  async function fetchUser () {
    const res = await getUser(currentUser);
    return res.json();
  }

  async function fetchUsers () {
    const res = await getUsers();
    return res.json();
  }

  // Queries
  const queryClient = useQueryClient();
  const { data: profile, status } = useQuery('user', fetchUser);
  const { data: users, status: userStatus } = useQuery('users', fetchUsers);

  // Mutations
  const eventMutation = useMutation(event => addEvent(event));
  const mutation = useMutation(
    params => updateUserAllergens(params),
    { onSuccess: () => { queryClient.invalidateQueries('user'); } }
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

  async function handleAllSubmit (e) {
    e.preventDefault();
    try {
      if (allergenRef.current.value.length > 1) {
        mutation.mutate({
          uid: profile.uid,
          allergens: [...profile.allergens, allergenRef.current.value]
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEventSubmit (e) {
    e.preventDefault();
    const newAllergens = [...new Set([...allergens, ...profile.allergens])];
    let res = await getMenu(newAllergens);
    const menu = await res.json();
    eventMutation.mutate({
      type,
      allergens: newAllergens,
      members,
      date: dateRef.current.value,
      menu
    });
    navigate('/');
  }

  function handleMembers (user) {
    if (members.length === 0) {
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
            {profile.aboutMe || `Hi, my name is ${profile.name}`}
          </div>
          <hr />
          <h3>My allergens</h3>
          <h2>
            {profile.allergens.map(all => (
              <Badge
                pill
                bg='success'
                className='me-2 p-3 fs-5'
              >
                {all}
              </Badge>
            ))}
          </h2>
          <Form onSubmit={handleAllSubmit}>
            <Form.Control
              type='text'
              ref={allergenRef}
              required
              style={{ maxWidth: 'fit-content' }}
              placeholder='new allergen'
            />
            <Button
              className='mt-2'
              type='submit'
            >
              Save
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
              <Dropdown autoClose={false}>
                <Dropdown.Toggle
                  variant='warning'
                  id='dropdown-users'
                >
                  {'Users'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {currentUser && users.map((user) => {
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
              style={{ maxWidth: 'fit-content' }}
            />
            <Button
              className='mt-2'
              type='submit'
            >
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
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
