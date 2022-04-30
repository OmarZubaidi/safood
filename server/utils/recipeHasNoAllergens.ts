// Local imports
import IRecipe from "../interfaces/Recipe.interface";

export default function recipeHasNoAllergens (recipe: IRecipe, allergens: string[]): boolean {
  return !allergens.some(allergen => recipe
    .ingredients
    ?.includes(allergen.toLowerCase())
  );
}
