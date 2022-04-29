// Local imports
const db = require('../db');
const sample = require('../utils/sampleFromArray');

function getMenu (req, res) {
  const allergens = JSON.parse(req.headers.allergens);
  const courses = ['starter', 'main', 'side'];
  const menu = [];
  courses.forEach(course => {
    const recipe = db.filter(recipe => {
      return !allergens.some(allergen =>
        recipe
          .ingredients
          ?.includes(allergen.toLowerCase())
        && recipe.dishTypes?.includes(course)
      );
    });
    menu.push(...sample(recipe, 1));
  });
  res.send(menu);
}

module.exports = { getMenu };
