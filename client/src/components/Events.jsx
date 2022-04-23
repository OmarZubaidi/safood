
import React, {useEffect, useRef, useState} from 'react'
import { Card, Form, Button, Dropdown, Navbar, Container, Nav } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import omar from '../img/omar.jpeg'

export default function Events(props) {
  const [type, setType] = useState();
  const {users, currentUser} = useAuth();
  const [members, setMembers] = useState([currentUser.uid]);
  const dateRef = useRef()

  function handleAllSubmit(e){
    e.preventDefault();
    console.log(type, members, dateRef.current.value)

  }

  function handleMembers(user){
    let newMembers = members;
    if(!members.includes(user)){
    newMembers.push(user);
    setMembers(newMembers);}
    else {
      let index = newMembers.indexOf(user);
      if(index > -1) {
        newMembers.splice(index, 1);
        setMembers(newMembers)}
    }
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
    <Form onSubmit={handleAllSubmit}  >
            <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-type">
               {type || 'Type'}
            </Dropdown.Toggle>
             <Dropdown.Menu>
               <Dropdown.Item onClick={() => setType('Breakfast')}>Breakfast</Dropdown.Item>
               <Dropdown.Item onClick={() => setType('Lunch')}>Lunch</Dropdown.Item>
               <Dropdown.Item onClick={() => setType('Dinner')}>Dinner</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown autoClose={false}>
              <Dropdown.Toggle variant="dark" className="mt-2" id="dropdown-users" >
               {'Users'}
            </Dropdown.Toggle>
             <Dropdown.Menu >
               {users && users.map((user) => { 
                 if(user.uid !== currentUser.uid) return (<Dropdown.Item key={user.uid} onClick={() => handleMembers(user.uid)} >{user.name}</Dropdown.Item>) })               }
              </Dropdown.Menu>
            </Dropdown>
            <Form.Label>
              Select a Date!
            </Form.Label>
            <Form.Control type='datetime-local' ref={dateRef}></Form.Control>
            <Button className='mt-2' type='submit'>Save</Button> 
    </Form>
    <Card>
      <Card.Img variant="top"  className="w-25 mb-4"/>
      <Card.ImgOverlay>
      <Card.Title className='text-center mb-4'></Card.Title>
      </Card.ImgOverlay>
    </Card>
    </>
  )
}