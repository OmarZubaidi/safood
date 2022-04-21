import React, { useRef } from 'react'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import Dashboard from './Dashboard'


export default function MainPage() {

  const target = useRef(null);


  function handleSubmit(e) {
    //
  }
  return (
    <>
    <Navbar fixed='top' expand="sm" bg='success' variant="dark" className='h-25' ref={target}>
      <Container>
        <Navbar.Brand href='/'>
        Safood
        </Navbar.Brand>
      <Form onSubmit={handleSubmit} className='d-flex'>
        <Form.Control type="text" placeholder='Search a recipe!'>
        </Form.Control>
        <Button type='submit' > Search!</Button> 
      </Form>
        <Nav>
          <Nav.Link href='/profile'> Profile </Nav.Link>
          <Nav.Link href='/'> Notifications </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Dashboard>
    </Dashboard>
    </>
  )
}
