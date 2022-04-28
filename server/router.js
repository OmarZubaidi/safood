'user strict';
const userController = require('./controller/user.controller');
const eventController = require('./controller/event.controller');
const recipeController = require('./controller/recipe.controller');

const router = require('express').Router();

// User routes
router.get('/user', userController.getUser);
router.get('/users', userController.getUsers);
router.post('/user', userController.postUser);
router.put('/user/allergens', userController.updateUserAllergens);
// router.put('/user/events',userController.updateUserEvents)

// Recipe routes
router.get('/recipe', recipeController.getRecipe);
router.get('/recipe/random', recipeController.getRandomRecipe);

///Event routes
router.get('/event/:_id', eventController.getEvent);
router.get('/events', eventController.getEvents);
router.post('/event', eventController.postEvent);
// Menu

router.get('/menu', recipeController.getMenu);

module.exports = router;
