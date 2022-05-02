// Package imports
import React, { useState, useRef } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Local imports
import { useAuth } from '../context/AuthContext';
import logo from '../img/Safe_2_-removebg-preview.png';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Dashboard from './Dashboard';
import EventDetails from './EventDetails';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import RecipeContainer from './RecipeContainer';
import { getUser, recipeQuery } from '../services';
import { IRecipe } from '../interfaces/Recipe.interface';
import { IUser } from '../interfaces/User.interface';

function App () {
  // Refs, states, navigation, and authentication
  const target = useRef(null);
  const stringRef = useRef<HTMLInputElement | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Get the user data
  const { data: profile, status } = useQuery<IUser>(
    'user',
    () => getUser(currentUser),
    { enabled: !!currentUser }
  );

  // Submit function
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!profile) return;
    try {
      recipeQuery(profile.allergens, stringRef.current!.value)
        .then((data: React.SetStateAction<IRecipe[]>) => { setRecipes(data); });
    } catch (error) {
      console.error(error);
    }
    navigate('/result');
  }

  // Loading and error handling
  if (status === 'loading') {
    return <div>loading</div>;
  }

  if (status === 'error') {
    return <div>error</div>;
  }

  return (
    <Container
      className='d-flex align-items-center justify-content-center '
      style={{ minHeight: '100vh' }}>
      <div
        className='w-100'
        style={{ minWidth: '400px' }}
      >
        <Navbar
          fixed='top'
          expand='sm'
          bg='dark'
          variant='dark'
          style={{ height: '200px' }}
          ref={target}
        >
          <Container>
            <div style={{ paddingTop: '40px' }}>
              <Link to='/'>
                <img
                  src={logo}
                  alt=''
                  style={{ height: '200px' }}
                />
              </Link>
            </div>
            <Form
              onSubmit={handleSubmit}
              className='d-flex'
            >
              <Form.Control
                type='text'
                placeholder='Search a recipe!'
                ref={stringRef}
                style={{ borderRadius: '15px 0 0 15px' }}
              />
              <Button
                type='submit'
                style={{ borderRadius: '0 10px 10px 0' }}
              >
                Search
              </Button>
            </Form>
            <Nav>
              <Link
                to='/profile'
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '25px'
                }}
              >
                Profile
              </Link>
            </Nav>
          </Container>
        </Navbar>
        <Container style={{ marginTop: '200px' }}>
          <Routes>
            <Route path='/' element={<PrivateRoute />} />
            <Route path='/main' element={<Dashboard />} />
            <Route path='/result' element={<RecipeContainer recipes={recipes} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/events/:id' element={<EventDetails />} />
          </Routes>
        </Container>
      </div>
    </Container>
  );
}

export default App;
