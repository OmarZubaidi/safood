// Local imports
const db = require('../db.json');
const recipeHasNoAllergens = require('../utils/recipeHasNoAllergens');
const sample = require('../utils/sampleFromArray');

function getMenu (req, res) {
  const allergens = JSON.parse(req.headers.allergens);
  const courses = ['starter', 'main', 'side'];
  const menu = [];

  courses.forEach(course => {
    const recipe = db.filter(recipe =>
      recipeHasNoAllergens(recipe, allergens)
      && recipe.dishTypes?.includes(course)
    );
    menu.push(...sample(recipe, 1));
  });

  res.status(200).send(menu);
}

module.exports = { getMenu };
