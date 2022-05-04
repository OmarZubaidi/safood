// Package imports
import React, { useRef } from 'react';
import { Badge, Button, Form } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';

// Local imports
import { IUser, IUserIdAndAllergens } from '../interfaces/User.interface';
import { updateUserAllergens } from '../services/index';

interface IProps {
  profile: IUser;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileAllergens ({ profile, setError }: IProps) {
  // Queries, refs, and mutations
  const queryClient = useQueryClient();
  const allergenRef = useRef<HTMLInputElement | null>(null);
  const mutation = useMutation(
    (params: IUserIdAndAllergens) => updateUserAllergens(params),
    { onSuccess: () => queryClient.invalidateQueries('user') }
  );

  // Handlers
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
      console.error(error);
      setError('Could not add allergen.')
    }
  }

  return (
    <>
      <h3>My allergens</h3>
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
    </>
  );
}

export default ProfileAllergens;
