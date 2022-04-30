// Local imports
import Recipe from "../interfaces/Recipe.interface";

export default function recipeHasKeywords (recipe: Recipe, keywords: string[]): boolean {
  return keywords.every(keyword => recipe
    .ingredients
    ?.includes(keyword.toLowerCase())
  );
}
