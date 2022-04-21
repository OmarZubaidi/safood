import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import EventsContainer from './EventsContainer'
import UsersContainer from './UsersContainer'
import RecipeContainer from './RecipeContainer'


export default function Dashboard() {
  const mockRecipes = [{
    "name": "arriba   baked winter squash mexican style",
    "id": "137739",
    "minutes": "55",
    "contributor_id": "47892",
    "submitted": "2005-09-16",
    "tags": "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'side-dishes', 'vegetables', 'mexican', 'easy', 'fall', 'holiday-event', 'vegetarian', 'winter', 'dietary', 'christmas', 'seasonal', 'squash']",
    "nutrition": "[51.5, 0.0, 13.0, 0.0, 2.0, 0.0, 4.0]",
    "n_steps": "11",
    "steps": "['make a choice and proceed with recipe', 'depending on size of squash , cut into half or fourths', 'remove seeds', 'for spicy squash , drizzle olive oil or melted butter over each cut squash piece', 'season with mexican seasoning mix ii', 'for sweet squash , drizzle melted honey , butter , grated piloncillo over each cut squash piece', 'season with sweet mexican spice mix', 'bake at 350 degrees , again depending on size , for 40 minutes up to an hour , until a fork can easily pierce the skin', 'be careful not to burn the squash especially if you opt to use sugar or butter', 'if you feel more comfortable , cover the squash with aluminum foil the first half hour , give or take , of baking', 'if desired , season with salt']",
    "description": "autumn is my favorite time of year to cook! this recipe \rcan be prepared either spicy or sweet, your choice!\rtwo of my posted mexican-inspired seasoning mix recipes are offered as suggestions.",
    "ingredients": "['winter squash', 'mexican seasoning', 'mixed spice', 'honey', 'butter', 'olive oil', 'salt']",
    "n_ingredients": "7"
},
{
    "name": "a bit different  breakfast pizza",
    "id": "31490",
    "minutes": "30",
    "contributor_id": "26278",
    "submitted": "2002-06-17",
    "tags": "['30-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'breakfast', 'main-dish', 'pork', 'american', 'oven', 'easy', 'kid-friendly', 'pizza', 'dietary', 'northeastern-united-states', 'meat', 'equipment']",
    "nutrition": "[173.4, 18.0, 0.0, 17.0, 22.0, 35.0, 1.0]",
    "n_steps": "9",
    "steps": "['preheat oven to 425 degrees f', 'press dough into the bottom and sides of a 12 inch pizza pan', 'bake for 5 minutes until set but not browned', 'cut sausage into small pieces', 'whisk eggs and milk in a bowl until frothy', 'spoon sausage over baked crust and sprinkle with cheese', 'pour egg mixture slowly over sausage and cheese', 's& p to taste', 'bake 15-20 minutes or until eggs are set and crust is brown']",
    "description": "this recipe calls for the crust to be prebaked a bit before adding ingredients. feel free to change sausage to ham or bacon. this warms well in the microwave for those late risers.",
    "ingredients": "['prepared pizza crust', 'sausage patty', 'eggs', 'milk', 'salt and pepper', 'cheese']",
    "n_ingredients": "6"
}]
  const mockEvents = [{name:'dinner', time:'tomorrow', guests:['paul','mary']}, {name:'dinner', time:'tomorrow', guests:['paul','mary']}]
  const mockUsers= [{name:'paul'},{name:'mary'}]

  return (
    <>
    <UsersContainer list={mockUsers}>

    </UsersContainer>
    <EventsContainer list={mockEvents}></EventsContainer>
    <RecipeContainer list={mockRecipes}></RecipeContainer>
    </>
  )
}
