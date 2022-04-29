// Local imports
const db = require('../db');
const sample = require('../utils/sampleFromArray');

function getRecipe (req, res) {
  const words = req.headers.string.split(' ');
  const allergens = JSON.parse(req.headers.allergens);

  res.send(db
    .filter(recipe => {
      if (
        words.every(word => recipe
          .ingredients
          ?.includes(word.toLowerCase())
        )
        && !allergens.some(allergen => recipe
          .ingredients
          ?.includes(allergen.toLowerCase())
        )
      ) return true;
      return false;
    })
    .slice(0, 10)
  );
}

function getRandomRecipe (req, res) {
  const allergens = JSON.parse(req.headers.allergens);

  let recipes = db.filter(recipe => {
    if (!allergens.some(allergen => recipe
      .ingredients
      ?.includes(allergen.toLowerCase())
    )) return true;
    return false;
  });

  res.send(sample(recipes, 4));
}

module.exports = { getRecipe, getRandomRecipe };
