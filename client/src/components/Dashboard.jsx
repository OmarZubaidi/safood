import React, { useEffect, useState } from 'react'
import EventsContainer from './EventsContainer'
import UsersContainer from './UsersContainer'
import RecipeContainer from './RecipeContainer'
import {recipeRandom} from './service'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(props) {
  const [recipes, setRecipes] = useState();
  const  {users, profile} = useAuth();

  useEffect(() => {
    getRandom()
  },[profile])

  async function getRandom() {
    try { 
      if(props.profile){
      recipeRandom(profile.allergens)
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
    <UsersContainer users={users}></UsersContainer>
   
    </>
  )
}
