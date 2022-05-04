// Package imports
import React, { useRef, useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { IEvent } from '../interfaces/Events.interface';

// Local imports
import { IUser } from '../interfaces/User.interface';
import { addEvent, getMenu } from '../services';

interface IProps {
  profile: IUser;
  users: IUser[] | undefined;
  currentUser: IUser;
  setError: React.Dispatch<React.SetStateAction<string>>
}

function ProfileEvent ({
  profile,
  users,
  currentUser,
  setError
}: IProps) {
  // States
  const [type, setType] = useState<string>('');
  const [allergens, setAllergens] = useState<string[]>([]);
  const [members, setMembers] = useState<string[]>([]);

  // Navigation, mutations, and refs
  const navigate = useNavigate();
  const eventMutation = useMutation((event: IEvent) => addEvent(event));
  const dateRef = useRef<HTMLInputElement | null>(null);

  // Handlers
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
      console.error(error);
      setError('Could not create event.')
    }
  }

  function handleMembers (user: IUser) {
    if (members.length === 0) members.push(profile.name);
    const newMembers = members;
    if (!members.includes(user.name)) {
      newMembers.push(user.name);
      setMembers(newMembers);
      const newAllergens = [...new Set([...allergens, ...user.allergens])];
      setAllergens(newAllergens);
    }
  }

  // Event types
  const eventTypes = ['Lunch', 'Dinner'];

  return (
    <>
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
              {eventTypes.map(eventType => (
                <Dropdown.Item
                  key={eventType}
                  onClick={() => setType(eventType)}
                >
                  {eventType}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant='warning'
              id='dropdown-users'
              className='me-2'
            >
              {'Users'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {users && users.map((user) => {
                if (user.uid === currentUser.uid) return null;
                return (
                  <Dropdown.Item
                    key={user.uid}
                    onClick={() => handleMembers(user)}
                  >
                    {user.name}
                  </Dropdown.Item>
                );
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
    </>
  );
}

export default ProfileEvent;
