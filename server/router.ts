// Package imports
import { Router } from 'express';

// Local imports
import {
  getUser,
  getUsers,
  postUser,
  updateUserAllergens
} from './controller/user.controller';
import {
  getEvent,
  getEvents,
  postEvent
} from './controller/event.controller';
import {
  getRecipe,
  getRandomRecipe
} from './controller/recipe.controller';
import { getMenu } from './controller/menu.controller';

const router = Router();

// User routes
router.get('/user', getUser);
router.post('/user', postUser);
router.put('/user/allergens', updateUserAllergens);
router.get('/users', getUsers);

// Recipe routes
router.get('/recipe', getRecipe);
router.get('/recipe/random', getRandomRecipe);

///Event routes
router.get('/events', getEvents);
router.post('/event', postEvent);
router.get('/event/:_id', getEvent);

// Menu
router.get('/menu', getMenu);

export default router;
