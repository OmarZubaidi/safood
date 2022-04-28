import React, { useRef, useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import Dashboard from './Dashboard';
import RecipeContainer from './RecipeContainer';
import { getUser, getUsers, recipeQuery } from './service';
import { useAuth } from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function MainPage (props) {

  const { currentUser } = useAuth();

  async function fetchUser () {
    const res = await getUser(currentUser);
    return res.json();
  }

  const { data: profile, status } = useQuery("user", fetchUser);

  if (status === "loading") {
    return <div>loading</div>;
  }

  if (status === "error") {
    return <div>error</div>;
  }

  return (
    <>
      <Container style={{ marginTop: '250px' }} >
        {!props.search ? <Dashboard profile={profile}></Dashboard> : <RecipeContainer recipes={props.recipes}></RecipeContainer>}
      </Container>
    </>
  );
}
