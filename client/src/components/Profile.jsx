import React, {useState} from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import {Link, useNavigate } from "react-router-dom"
import {useAuth} from "../context/AuthContext"

export default function Profile() {
  const {logout, currentUser} = useAuth();
  const [error, setError] = useState('')
  const navigate = useNavigate();

  async function handleLogout( ){
    setError('');
    try {
      await logout();
      navigate('/login')
    } catch (error) {
      setError('failed to logout')
    }
  }

  return (
    <>
    <Card>
      <Card.Body>
      <h2 className='text-center mb-4'>Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {currentUser.email}
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      <Button variant="link" onClick={handleLogout}> Log Out </Button>
    </div>
    </>
  )
}
