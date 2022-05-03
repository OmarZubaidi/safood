// Package imports
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Alert } from 'react-bootstrap';

// Local imports
import { useAuth } from '../../context/AuthContext';

export default function Login () {
  // Refs, states, and navigation
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Submit function
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if(!email || !password) return setError('Email and password are required');
      await login(
        email,
        password
      );
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Failed to sign in.');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>
            Log in
          </h2>
          {error && <Alert id='alert' variant='danger'>
            {error}
          </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label htmlFor="email">
                E-mail
              </Form.Label>
              <Form.Control
                name="email"
                aria-label="email"
                type='email'
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label htmlFor="password">
                Password
              </Form.Label>
              <Form.Control
                name="password"
                aria-label="password"
                type='password'
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100 mt-4'
              type='submit'
            >
              Log in
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>
          Sign up
        </Link>
      </div>
    </>
  );
}
