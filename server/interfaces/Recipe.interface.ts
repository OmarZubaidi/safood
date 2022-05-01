// Package imports
import { ObjectId } from 'mongoose';

export default interface IRecipe {
  // Parse these
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

export interface IRecipeDB extends IRecipe {
  _id: ObjectId;
}