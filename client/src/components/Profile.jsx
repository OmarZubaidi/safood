import React, {useState, useRef} from 'react'
import { Card, Button, Alert, ListGroup, Form, CardGroup, Navbar, Container, Nav, Dropdown } from "react-bootstrap"
import {useNavigate } from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import {addEvent, getMenu, getUser, getUsers, updateUserAllergens } from './service';
import {useQuery, useMutation, useQueryClient} from "react-query"

export default function Profile() {
  const {logout, updateProfile, currentUser} = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  ///states
  const [type, setType] = useState();
  const [error, setError] = useState('')
  const [members, setMembers] = useState([]);
  const [allergens, setAllergens] = useState([]);


  ////Refs
  const allergenRef = useRef();
  const dateRef = useRef()

////Funcs

  
  async function fetchUser(){
    const res = await getUser(currentUser)
    return res.json()
  }

  
  async function fetchUsers(){
    const res = await getUsers()
    return res.json()
  }

  
  
  const {data: profile, status} = useQuery("user", fetchUser)
  const {data: users, status: userStatus} = useQuery("users", fetchUsers);

  const eventMutation = useMutation(event => {
    return  addEvent(event)
  });

  const mutation = useMutation((params) => {
    return updateUserAllergens(params)},
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user")
      }
    })


////handlers

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

  async function handleEventSubmit(e){
    e.preventDefault();
    const newAllergens = [...new Set([...allergens, ...profile.allergens])]
    let res = await getMenu(newAllergens);
    const menu = await res.json();
    mutation.mutate({type, allergens: newAllergens, members, date: dateRef.current.value, menu})
  }
  
  function handleMembers(user){
    if(members.length === 0){
       members.push(profile.name)
    }   
    let newMembers = members;
    if(!members.includes(user.name)){
      newMembers.push(user.name);
      setMembers(newMembers);
      console.log(allergens)
      let newAllergens = [...new Set([...allergens, ...user.allergens])]
      console.log(newAllergens)
     setAllergens(newAllergens)
    }
  }


  if(status === "loading" || userStatus === "loading"){
    return <div>loading...</div>
  }

  if(status === "error" || userStatus === "error"){
    return <div>error</div>
  }


  return (
    <>
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
            <Form onSubmit={handleEventSubmit}  >
            <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-type">
               {type || 'Type'}
            </Dropdown.Toggle>
             <Dropdown.Menu>
               <Dropdown.Item onClick={() => setType('Lunch')}>Lunch</Dropdown.Item>
               <Dropdown.Item onClick={() => setType('Dinner')}>Dinner</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown autoClose={false}>
              <Dropdown.Toggle variant="dark" className="mt-2" id="dropdown-users" >
               {'Users'}
            </Dropdown.Toggle>
             <Dropdown.Menu >
               {currentUser && users.map((user) => { 
                 if(user.uid !== currentUser.uid) return (<Dropdown.Item key={user.uid} onClick={() => handleMembers(user)} >{user.name}</Dropdown.Item>) })               }
              </Dropdown.Menu>
            </Dropdown>
            <Form.Label>
              Select a Date!
            </Form.Label>
            <Form.Control type='datetime-local' ref={dateRef}></Form.Control>
            <Button className='mt-2' type='submit'>Save</Button> 
    </Form>
        </ListGroup>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
      <Button variant="link" onClick={handleLogout}> Log Out </Button>
    </div>
    </>
  )
}
