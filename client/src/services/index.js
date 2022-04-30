// Local imports
import { api } from './api';

function getUsers () {
  return api({
    method: 'GET',
    url: 'users',
  });
}

function getUser (user) {
  return api({
    method: 'GET',
    url: 'user',
    headers: { uid: user.uid },
  });
}

function postUser (user) {
  return api({
    method: 'POST',
    url: 'user',
    body: JSON.stringify(user),
  });
}

function updateUserAllergens (user) {
  return api({
    method: 'PUT',
    url: 'user/allergens',
    body: JSON.stringify(user),
  });
}

function recipeQuery (allergens, string) {
  return api({
    method: 'GET',
    url: 'recipe',
    headers: {
      'Access-Control-Allow-Origin': '*',
      string,
      allergens: JSON.stringify(allergens),
    },
  });
}

function recipeRandom (allergens) {
  return api({
    method: 'GET',
    url: 'recipe/random',
    headers: {
      'Access-Control-Allow-Origin': '*',
      allergens: JSON.stringify(allergens),
    }
  });
}

function getMenu (allergens) {
  return api({
    method: 'GET',
    url: 'menu',
    headers: {
      allergens: JSON.stringify(allergens),
    }
  });
}

function addEvent (event) {
  return api({
    method: 'POST',
    url: 'event',
    body: JSON.stringify(event),
  });
}

function getEvents (name) {
  return api({
    method: 'GET',
    url: 'events',
  });
}

function getEvent (id) {
  return api({
    method: 'GET',
    url: `event/${id}`,
  });
}

export {
  getUser,
  getUsers,
  postUser,
  updateUserAllergens,
  recipeQuery,
  recipeRandom,
  addEvent,
  getEvents,
  getEvent,
  getMenu
};
