// Local imports
const db = require('../db');

function getRecipe (req, res) {
  let words = req.headers.string.split(' ');
  let allergens = JSON.parse(req.headers.allergens);
  //let words = ['egg','mayo','tomato','pepper']

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
  let allergens = JSON.parse(req.headers.allergens);
  //let words = ['egg','mayo','tomato','pepper']

  let result = db.filter(recipe => {
    if (!allergens.some(allergen => recipe
      .ingredients
      ?.includes(allergen.toLowerCase())
    )) return true;
    return false;
  });
  // TODO refactor to just choose from the array instead of calling Math.random()
  let randomI = [
    Math.floor(Math.random() * result.length),
    Math.floor(Math.random() * result.length),
    Math.floor(Math.random() * result.length),
    Math.floor(Math.random() * result.length)
  ];

  res.send([
    result[randomI[0]],
    result[randomI[1]],
    result[randomI[2]],
    result[randomI[3]]
  ]);
}

function getMenu (req, res) {
  const allergens = JSON.parse(req.headers.allergens);
  const courses = ['starter', 'main', 'side'];
  const menu = [];
  courses.forEach(course => {
    let result = db.filter(recipe => {
      if (
        !allergens.some(allergen => recipe
          .ingredients
          ?.includes(allergen.toLowerCase()))
        && recipe.dishTypes?.includes(course)
      ) return true;
      return false;
    });
    // TODO refactor to just choose from the array instead of calling Math.random()
    menu.push(result[Math.floor(Math.random() * result.length)]);
  });
  res.send(menu);
}

module.exports = { getRecipe, getRandomRecipe, getMenu };
