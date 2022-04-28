import React, { useState, useRef } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
export default function Login () {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError('failed to sign in ');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label >E-mail</Form.Label>
              <Form.Control type='email' ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label >password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>Log in</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  );
}
