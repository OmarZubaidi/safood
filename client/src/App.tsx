// Package imports
import React, { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import { useQuery } from 'react-query';
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Local imports
import { useAuth } from './context/AuthContext';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Dashboard from './components/Dashboard';
import EventDetails from './components/EventDetails';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import RecipeContainer from './components/RecipeContainer';
import { getUser } from './services/index';
import { IRecipe } from './interfaces/Recipe.interface';
import { IUser } from './interfaces/User.interface';
import GenericNavbar from './components//Navbar';

function App () {
  // Refs, states, navigation, and authentication
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const { currentUser } = useAuth();

  // Get the user data
  const { status } = useQuery<IUser>(
    'user',
    () => getUser(currentUser),
    { enabled: !!currentUser }
  );


  // Loading and error handling
  if (status === 'loading') return <div>loading</div>;
  if (status === 'error') return <div>error</div>;

  return (
    <Container
      className='d-flex align-items-center justify-content-center '
      style={{ minHeight: '100vh' }}>
      <div
        className='w-100'
        style={{ minWidth: '400px' }}
      >
        <GenericNavbar setRecipes={setRecipes} />

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
