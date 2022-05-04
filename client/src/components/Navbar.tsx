// Package imports
import React, { useRef } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';

// Local imports
import { useAuth } from '../context/AuthContext';
import logo from '../img/logo.png';

import { getUser, recipeQuery } from '../services/index';
import { IRecipe } from '../interfaces/Recipe.interface';
import { IUser } from '../interfaces/User.interface';


function GenericNavbar({setRecipes}: any) {

  const target = useRef(null);
  const searchStringRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { logout, updateProfile, currentUser } = useAuth();

  const { data: profile } = useQuery<IUser>(
    'user',
    () => getUser(currentUser),
    { enabled: !!currentUser }
  );

  async function handleLogout () {
    try {
      await logout();
      updateProfile(null);
      navigate('/');
    } catch (error) {
    }
  }

  // Submit function
  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    console.log('search called!');
    e.preventDefault();
    if(!profile) return;
    try {
      const data: React.SetStateAction<IRecipe[]> = await recipeQuery(
        profile.allergens,
        searchStringRef.current!.value
      )
      console.log(data)
      setRecipes(data);
      navigate('/result');
    } catch (error) {
      console.error(error);
      // TODO Error state that displays a message in every console.error.
    }
  }

  return ( 
    <Navbar
          fixed='top'
          expand='sm'
          bg='dark'
          variant='dark'
          style={{ height: '200px' }}
          ref={target}
        >
          <Container>
            <div style={{ padding: 'auto' }}>
              <Link to='/'>
                <img
                  src={logo}
                  alt=''
                  style={{ height: '125px' }}
                />
              </Link>
            </div>
            {currentUser &&
            <>
            <Form
              onSubmit={handleSubmit}
              className='d-flex'
            >
              <Form.Control
                type='text'
                placeholder='Search a recipe!'
                ref={searchStringRef}
                id='search-input'
                style={{ borderRadius: '10px 0 0 10px' }}
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
              
              <a
                id="logout-button"
                href='/'
                onClick={handleLogout}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '25px',
                  marginLeft: '30px'
                }}
              >
                Logout
              </a>
            </Nav>
            </>
            }
          </Container>
        </Navbar>
  );
}

export default GenericNavbar;