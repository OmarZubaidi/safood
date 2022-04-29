// Local imports
const db = require('../db');

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

  const recipes = db.filter(recipe => {
    if (!allergens.some(allergen => recipe
      .ingredients
      ?.includes(allergen.toLowerCase())
    )) return true;
    return false;
  });
  // TODO refactor to just choose from the array instead of calling Math.random()
  const randomI = [
    Math.floor(Math.random() * recipes.length),
    Math.floor(Math.random() * recipes.length),
    Math.floor(Math.random() * recipes.length),
    Math.floor(Math.random() * recipes.length)
  ];

  res.send([
    recipes[randomI[0]],
    recipes[randomI[1]],
    recipes[randomI[2]],
    recipes[randomI[3]]
  ]);
}

function getMenu (req, res) {
  const allergens = JSON.parse(req.headers.allergens);
  const courses = ['starter', 'main', 'side'];
  const menu = [];
  courses.forEach(course => {
    const recipe = db.filter(recipe => {
      if (
        !allergens.some(allergen => recipe
          .ingredients
          ?.includes(allergen.toLowerCase()))
        && recipe.dishTypes?.includes(course)
      ) return true;
      return false;
    });
    // TODO refactor to just choose from the array instead of calling Math.random()
    menu.push(recipe[Math.floor(Math.random() * recipe.length)]);
  });
  res.send(menu);
}

module.exports = { getRecipe, getRandomRecipe, getMenu };
