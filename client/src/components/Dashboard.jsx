import React, { useEffect, useState } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import EventsContainer from './EventsContainer'
import UsersContainer from './UsersContainer'
import RecipeContainer from './RecipeContainer'
import {recipeRandom} from './service'
import { useProfile } from '../context/ProfileContext'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(props) {
  const mockAll = ['potato','milk','egg','pepper']
  const [recipes, setRecipes] = useState();
  const {profile} = useAuth();

  useEffect(() => {
    getRandom()
  },[props.profile])

  async function getRandom() {
    try {
      if(props.profile){
      recipeRandom(props.profile.allergens)
      .then(response => response.json())
      .then(data => setRecipes(data));}
    } catch (error) {
      console.log(error)
    }

  }

  const mockEvents = [{name:'dinner', time:'tomorrow', guests:['paul','mary']}, {name:'dinner', time:'tomorrow', guests:['paul','mary']}]
  const mockUsers= [{name:'Omar'},{name:'Alia'}]

  return (
    <>
    <RecipeContainer recipes={recipes}></RecipeContainer>
    <EventsContainer list={mockEvents}></EventsContainer>
    <UsersContainer list={mockUsers}></UsersContainer>
   
    </>
  )
}
