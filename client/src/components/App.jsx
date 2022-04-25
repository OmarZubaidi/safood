import React, { useRef, useState,useEffect } from 'react'
import Signup from './Authentication/Signup'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container, Navbar, Nav, Form, Button} from "react-bootstrap"
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Profile from './Profile'
import Login from  './Authentication/Login'
import PrivateRoute from './PrivateRoute'
import MainPage from './MainPage'
import Events from './Events'
import { QueryClientProvider, QueryClient } from "react-query"

import Dashboard from './Dashboard'
import RecipeContainer from './RecipeContainer';
import { useAuth } from '../context/AuthContext';

import {getUser, recipeQuery } from './service';
import {useQuery, useMutation, useQueryClient} from "react-query"

const queryClient = new QueryClient()

function App() {

    
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
        

        <Container 
        className='d-flex align-items-center justify-content-center ' 
        style={{minHeight: "100vh"}}>
            <div className='w-100' style={{minWidth: "400px"}}>
            <Navbar  fixed="top" expand="sm" bg='success' variant="dark" style={{height: '200px' }} /*   */ >
                <Container>
                    <Navbar.Brand href='/'>
                        Safood
                    </Navbar.Brand>
                    <Form /* onSubmit={handleSubmit} */ className='d-flex'>
                        <Form.Control type="text" placeholder='Search a recipe!' /* ref={stringRef} */>
                        </Form.Control>
                        <Button type='submit' > Search!</Button> 
                    </Form>
                    <Nav>
                        <Nav.Link href='/profile'> Profile </Nav.Link>
                        <Nav.Link href='/'> Notifications </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
                <Router>
                <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Routes>
                        <Route path="/main" element={<MainPage/>} />
                        <Route path="/signup" element={<Signup/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/events" element={<Events/>} />
                        <Route exact path="/" element={<PrivateRoute/>}></Route>

                    </Routes>
                </AuthProvider>
                </QueryClientProvider>
                </Router>
            </div>
        </Container>
        
    )
}

export default App