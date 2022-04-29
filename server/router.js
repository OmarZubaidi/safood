'use strict';

// Package imports
const { Router } = require('express');

// Local imports
const {
  getUser,
  getUsers,
  postUser,
  updateUserAllergens
} = require('./controller/user.controller');
const {
  getEvent,
  getEvents,
  postEvent
} = require('./controller/event.controller');
const {
  getRecipe,
  getRandomRecipe
} = require('./controller/recipe.controller');
const { getMenu } = require('./controller/menu.controller');

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

module.exports = router;
