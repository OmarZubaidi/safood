// Local imports
import { apiGetter, apiPoster, apiPutter } from './api';

function getUsers () {
  return apiGetter({ url: 'users' });
}

function getUser (user) {
  return apiGetter({
    url: 'user',
    headers: { uid: user.uid },
  });
}

function postUser (user) {
  return apiPoster({
    url: 'user',
    body: JSON.stringify(user),
  });
}

function updateUserAllergens (user) {
  return apiPutter({
    url: 'user/allergens',
    body: JSON.stringify(user),
  });
}

function recipeQuery (allergens, string) {
  return apiGetter({
    url: 'recipe',
    headers: {
      'Access-Control-Allow-Origin': '*',
      string,
      allergens: JSON.stringify(allergens),
    },
  });
}

function recipeRandom (allergens) {
  return apiGetter({
    url: 'recipe/random',
    headers: {
      'Access-Control-Allow-Origin': '*',
      allergens: JSON.stringify(allergens),
    }
  });
}

function getMenu (allergens) {
  return apiGetter({
    url: 'menu',
    headers: {
      allergens: JSON.stringify(allergens),
    }
  });
}

function addEvent (event) {
  return apiPoster({
    url: 'event',
    body: JSON.stringify(event),
  });
}

function getEvents (name) {
  return apiGetter({ url: 'events' });
}

function getEvent (id) {
  return apiGetter({ url: `event/${id}` });
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
