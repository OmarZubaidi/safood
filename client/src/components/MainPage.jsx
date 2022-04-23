import React, { useRef, useState,useEffect } from 'react'
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap'
import Dashboard from './Dashboard'
import RecipeContainer from './RecipeContainer';
import { getUsers, recipeQuery } from './service';
import { useAuth } from '../context/AuthContext';

import {getUser, updateUserAllergens } from './service';
import {useQuery, useMutation, useQueryClient} from "react-query"

export default function MainPage() {

  const target = useRef(null);
  const stringRef = useRef('');
  const {currentUser} = useAuth();
  const [search, setSearch] = useState(false)
  const [recipes, setRecipes] = useState()

  async function fetchUser(){
    const res = await getUser(currentUser)
    return res.json()
  }

  const {data: profile, status} = useQuery("user", fetchUser)

  async function handleSubmit(e) {
    e.preventDefault();
    setSearch(true)
    try {
      recipeQuery(profile.allergens, stringRef.current.value)
      .then(response => response.json())
      .then(data => {setRecipes(data)}
      );
    } catch (error) {
      console.log(error)
    }

  }

  if(status === "loading"){
    return <div>loading</div>
  }

  if(status === "error"){
    return <div>error</div>
  }

  return (
  <>
    <Navbar  fixed="top" expand="sm" bg='success' variant="dark" style={{height: '200px' }} ref={target} >
      <Container>
        <Navbar.Brand href='/'>
        Safood
        </Navbar.Brand>
      <Form onSubmit={handleSubmit} className='d-flex'>
        <Form.Control type="text" placeholder='Search a recipe!' ref={stringRef}>
        </Form.Control>
        <Button type='submit' > Search!</Button> 
      </Form>
        <Nav>
          <Nav.Link href='/profile'> Profile </Nav.Link>
          <Nav.Link href='/'> Notifications </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Container style={{marginTop: '250px'}} >
      {!search ? <Dashboard profile={profile}></Dashboard> : <RecipeContainer recipes={recipes}></RecipeContainer>}
    </Container>
  </>
  )
}
