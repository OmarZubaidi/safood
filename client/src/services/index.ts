// Local imports
import { IEvent } from '../interfaces/Events.interface';
import { IRecipe } from '../interfaces/Recipe.interface';
import { IUser, IUserIdAndAllergens } from '../interfaces/User.interface';
import { apiGetter, apiPoster, apiPutter } from './api';

function getUsers(): IUser[] {
  return apiGetter({ url: 'users' });
}

function getUser(user: IUser): IUser{
  return apiGetter({
    url: 'user',
    headers: { uid: user.uid },
  });
}

function postUser(user: IUser): IUser {
  return apiPoster({
    url: 'user',
    body: JSON.stringify(user),
  });
}

function updateUserAllergens(user: IUserIdAndAllergens): any {
  return apiPutter({
    url: 'user/allergens',
    body: JSON.stringify(user),
  });
}

function recipeQuery(allergens: string[], searchString: string): any {
  return apiGetter({
    url: 'recipe',
    headers: {
      'Access-Control-Allow-Origin': '*',
      string: searchString,
      allergens: JSON.stringify(allergens)
    },
  });
}

function recipeRandom(allergens: string[]): IRecipe[] {
  return apiGetter({
    url: 'recipe/random',
    headers: {
      'Access-Control-Allow-Origin': '*',
      allergens: JSON.stringify(allergens),
    }
  });
}

function getMenu(allergens: string[]): IRecipe[] {
  return apiGetter({
    url: 'menu',
    headers: {
      allergens: JSON.stringify(allergens),
    }
  });
}

function addEvent(event: IEvent): any {
  return apiPoster({
    url: 'event',
    body: JSON.stringify(event),
  });
}

function getEvents(): IEvent[] {
  return apiGetter({ url: 'events' });
}

function getEvent(id: string): IEvent{
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
