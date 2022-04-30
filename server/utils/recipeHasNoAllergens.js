function recipeHasNoAllergens (recipe, allergens) {
  return !allergens.some(allergen => recipe
    .ingredients
    ?.includes(allergen.toLowerCase())
  );
}

module.exports = recipeHasNoAllergens;