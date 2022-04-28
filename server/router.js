'use strict';

// Package imports
const { Router } = require('express');

// Local imports
const userController = require('./controller/user.controller');
const eventController = require('./controller/event.controller');
const recipeController = require('./controller/recipe.controller');

const router = Router();

// User routes
router.get('/user', userController.getUser);
router.post('/user', userController.postUser);
router.put('/user/allergens', userController.updateUserAllergens);
router.get('/users', userController.getUsers);

// Recipe routes
router.get('/recipe', recipeController.getRecipe);
router.get('/recipe/random', recipeController.getRandomRecipe);

///Event routes
router.get('/events', eventController.getEvents);
router.post('/event', eventController.postEvent);
router.get('/event/:_id', eventController.getEvent);

// Menu
router.get('/menu', recipeController.getMenu);

module.exports = router;
