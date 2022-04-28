import React, { useState, useRef } from "react";
import Signup from './Authentication/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, Form, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Profile from './Profile';
import Login from './Authentication/Login';
import PrivateRoute from './PrivateRoute';
import MainPage from './MainPage';
import Events from './Events';
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import { getUser, getUsers, recipeQuery } from './service';
import { useAuth } from '../context/AuthContext';
import RecipeContainer from './RecipeContainer';
import Dashboard from './Dashboard';
import { useNavigate } from "react-router-dom";

function App () {
  const { currentUser } = useAuth();
  const target = useRef(null);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState();
  const stringRef = useRef('');

  async function fetchUser () {
    const res = await getUser(currentUser);
    return res.json();
  }

  const { isIdle, data: profile, status } = useQuery("user", fetchUser, {
    enabled: !!currentUser
  });

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      recipeQuery(profile.allergens, stringRef.current.value)
        .then(response => response.json())
        .then(data => { setRecipes(data); }
        );
    } catch (error) {
      console.log(error);
    }
    navigate('/result');
  }

  if (status === "loading") {
    return <div>loading</div>;
  }

  if (status === "error") {
    return <div>error</div>;
  }

  return (
    <Container
      className='d-flex align-items-center justify-content-center '
      style={{ minHeight: "100vh" }}>
      <div className='w-100' style={{ minWidth: "400px" }}>
        <Navbar fixed="top" expand="sm" bg='success' variant="dark" style={{ height: '200px' }} ref={target} >
          <Container>
            <Link to='/'>SAFOOD</Link>
            <Form onSubmit={handleSubmit} className='d-flex'>
              <Form.Control type="text" placeholder='Search a recipe!' ref={stringRef}>
              </Form.Control>
              <Button type='submit' > Search!</Button>
            </Form>
            <Nav>
              <Link to='/profile'> Profile </Link>
              <Link to='/'> Notifications </Link>
            </Nav>
          </Container>
        </Navbar>
        <Container style={{ marginTop: '250px' }} >
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}></Route>
            <Route path="/main" element={<Dashboard />} />
            <Route path="/result" element={<RecipeContainer recipes={recipes} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </Container>
      </div>
    </Container>
  );
}

export default App;
