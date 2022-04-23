
import React, {useRef, useState} from 'react'
import { Card, Form, Button, Dropdown, Navbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import omar from '../img/omar.jpeg'
import { addEvent, getUser, getUsers } from './service';
import {useQuery, useMutation, useQueryClient} from "react-query"


export default function Events(props) { 

  const [type, setType] = useState();
  const {currentUser} = useAuth();
  const [members, setMembers] = useState([]);
  const dateRef = useRef()
  const [allergens, setAllergens] = useState([]);
  const [event, setEvent] = useState();

  async function fetchUser(){
    const res = await getUser(currentUser)
    return res.json()
  }

  async function fetchUsers(){
    const res = await getUsers()
    return res.json()
  }

  const {data: profile, status: profileStatus} = useQuery("user", fetchUser);
  const {data: users, status: userStatus} = useQuery("users", fetchUsers);



  function handleAllSubmit(e){
    e.preventDefault();
    const newAllergens = [...new Set([...allergens, ...profile.allergens])]
    console.log(type, members, dateRef.current.value, newAllergens)
    addEvent({type, allergens: newAllergens, members, date: dateRef.current.value})
        .then(response => response.json())
        .then(data => {setEvent(data)
        });

  }

  //react query


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


  if(profileStatus === "loading" || userStatus === "loading"){
    return <div>loading</div>
  }

  if(profileStatus === "error"|| userStatus === "error"){
    return <div>error</div>
  }

  return (
    <>
    <Navbar  fixed="top" expand="sm" bg='success' variant="dark" style={{height: '100px' }} >
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
    <Form onSubmit={handleAllSubmit}  >
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
               {users.map((user) => { 
                 if(user.uid !== currentUser.uid) return (<Dropdown.Item key={user.uid} onClick={() => handleMembers(user)} >{user.name}</Dropdown.Item>) })               }
              </Dropdown.Menu>
            </Dropdown>
            <Form.Label>
              Select a Date!
            </Form.Label>
            <Form.Control type='datetime-local' ref={dateRef}></Form.Control>
            <Button className='mt-2' type='submit'>Save</Button> 
    </Form>
    {event && <Card>
      <Card.Img variant="top" className="w-25 mb-4"/>
      <Card.ImgOverlay>
      <Card.Title className='text-center mb-4'>{event.date}</Card.Title>
      <Card.Text>
        {event.members}, {event.allergens}, {event.type}
      </Card.Text>
      </Card.ImgOverlay>
    </Card>}
    </>
  )
}