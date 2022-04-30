// Local imports
import Recipe from "../interfaces/Recipe.interface";

export default function recipeHasNoAllergens (recipe: Recipe, allergens: string[]): boolean {
  return !allergens.some(allergen => recipe
    .ingredients
    ?.includes(allergen.toLowerCase())
  );
}
