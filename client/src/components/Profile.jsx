import React, {useState, useRef} from 'react'
import { Card, Button, Alert, ListGroup, Form, CardGroup, Navbar, Container, Nav } from "react-bootstrap"
import {useNavigate } from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {getUser, updateUserAllergens } from './service';
import {useQuery, useMutation, useQueryClient} from "react-query"

export default function Profile() {
  const {logout, updateProfile, currentUser} = useAuth();
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const allergenRef = useRef();

  
  async function fetchUser(){
    const res = await getUser(currentUser)
    return res.json()
  }

  const queryClient = useQueryClient();
  
  const {data: profile, status} = useQuery("user", fetchUser)

  const mutation = useMutation((params) => {
    return updateUserAllergens(params)},
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user")
      }
    })

  async function handleLogout( ){
    setError('');
    try {
      await logout();
      updateProfile(null);
      navigate('/login')
    } catch (error) {
      setError('failed to logout')
    }
  }


  async function handleAllSubmit (e) {
    e.preventDefault();
    try {
      if(allergenRef.current.value.length > 1){
      mutation.mutate({uid: profile.uid, allergens: [...profile.allergens, allergenRef.current.value]})

      }
    
    } catch (error) {
      console.log(error)
    }

  }

  if(status === "loading"){
    return <div>loading...</div>
  }

  if(status === "error"){
    return <div>error</div>
  }


  return (
    <>
    <Navbar  fixed="top" expand="sm" bg='success' variant="dark" style={{height: '200px' }} >
      <Container>
        <Navbar.Brand href='/'>
        Safood
        </Navbar.Brand>
        <Nav>
          <Nav.Link href='/profile'> Profile </Nav.Link>
          <Nav.Link href='/'> Notifications </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Card  style={{marginTop: '150px'}}>
      <Card.Body>
      <h2 className='text-center mb-4'>Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Card.Title>
      {profile.name}
      </Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <CardGroup>
            {profile.allergens.map(all => (<Card key={all}><Card.Body>{all}</Card.Body></Card>))}
            </CardGroup>
            <Form onSubmit={handleAllSubmit} >
            <Form.Control type='text' ref={allergenRef} required style={{maxWidth: 'fit-content'}} placeholder="new allergen"></Form.Control>
            <Button className='mt-2' type='submit'>Save</Button> 
            </Form>
            </ListGroup.Item>
            
          <Nav>
          <Nav.Link href='/events'> Create a new Event </Nav.Link>
          </Nav>
        </ListGroup>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      <Button variant="link" onClick={handleLogout}> Log Out </Button>
    </div>
    </>
  )
}
