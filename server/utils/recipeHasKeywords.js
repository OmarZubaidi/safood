function recipeHasKeywords (recipe, keywords) {
  return keywords.every(keyword => recipe
    .ingredients
    ?.includes(keyword.toLowerCase())
  );
}

module.exports = recipeHasKeywords;