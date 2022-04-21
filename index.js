const db = require('./json/full_format_recipes.json');
console.log(db.filter(el => el.ingredients?.some(ingredient => ingredient.toLowerCase().includes('chicken'))))
