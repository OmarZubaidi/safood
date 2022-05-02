interface IRecipe {
  id: string;
  title: string;
  vegetarian: string;
  vegan: string;
  glutenFree: string;
  dairyFree: string;
  sustainable: string;
  veryHealthy: string;
  veryPopular: string;
  lowFodmap: string;
  ketogenic: string;
  whole30: string;
  readyInMinutes: string;
  image: string;
  dishTypes: string;
  ingredients: string;
}

interface IRecipeContainerProps {
  recipes: Array<IRecipe>
}


interface IRecipeProps {
  recipe: IRecipe
}

export {
  IRecipe,
  IRecipeContainerProps,
  IRecipeProps
}