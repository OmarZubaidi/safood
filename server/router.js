'user strict';
const userController = require('./controller/user.controller')
const eventController = require('./controller/event.controller')
const recipeController = require('./controller/recipe.controller')

const router = require('express').Router();

router.get('/user', userController.getUser);
router.get('/users', userController.getUsers);
router.post('/user', userController.postUser);
router.put('/user/allergens',userController.updateUserAllergens);
//router.put('/user/events',userController.updateUserEvents)
router.get('/recipe', recipeController.getRecipe);
router.get('/recipe/random', recipeController.getRandomRecipe);


module.exports = router;