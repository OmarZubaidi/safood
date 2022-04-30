// Local imports
const db = require('../db.json');
const sample = require('../utils/sampleFromArray');
const recipeHasNoAllergens = require('../utils/recipeHasNoAllergens');
const recipeHasKeywords = require('../utils/recipeHasKeywords');

function getRecipe (req, res) {
  const keywords = req.headers.string.split(' ');
  const allergens = JSON.parse(req.headers.allergens);

  const recipes = db.filter(recipe =>
    recipeHasKeywords(recipe, keywords)
    && recipeHasNoAllergens(recipe, allergens)
  );

  res.status(200).send(sample(recipes, 10));
}

function getRandomRecipe (req, res) {
  const allergens = JSON.parse(req.headers.allergens);

  const recipes = db.filter(recipe =>
    recipeHasNoAllergens(recipe, allergens)
  );

  res.status(200).send(sample(recipes, 4));
}

module.exports = { getRecipe, getRandomRecipe };
