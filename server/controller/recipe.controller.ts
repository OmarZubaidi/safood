// Package imports
import { Request, Response } from 'express';

// Local imports
import db from '../db.json';
import IRecipe from '../interfaces/Recipe.interface';
import sample from '../utils/sampleFromArray';
import recipeHasKeywords from '../utils/recipeHasKeywords';
import recipeHasNoAllergens from '../utils/recipeHasNoAllergens';

export function getRecipe (req: Request, res: Response) {
  const keywordsCombined: string = req.headers.string as string;
  const keywords = keywordsCombined.split(' ');
  const allergens: string[] = JSON.parse(req.headers.allergens as string);

  const recipes: IRecipe[] = db.filter(recipe =>
    recipeHasKeywords(recipe, keywords)
    && recipeHasNoAllergens(recipe, allergens)
  );

  res.status(200).send(sample(recipes, 10));
}

export function getRandomRecipe (req: Request, res: Response) {
  const allergens: string[] = JSON.parse(req.headers.allergens as string);

  const recipes = db.filter(recipe =>
    recipeHasNoAllergens(recipe, allergens)
  );

  res.status(200).send(sample(recipes, 4));
}
