// Local imports
import IRecipe from "../interfaces/Recipe.interface";

export default function recipeHasKeywords (recipe: IRecipe, keywords: string[]): boolean {
  return keywords.every(keyword => recipe
    .ingredients
    ?.includes(keyword.toLowerCase())
  );
}
