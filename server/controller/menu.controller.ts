// Package imports
import { Request, Response } from 'express';

// Local imports
import db from '../db.json';
import Recipe from '../interfaces/Recipe.interface';
import sample from '../utils/sampleFromArray';
import recipeHasNoAllergens from '../utils/recipeHasNoAllergens';

export function getMenu (req: Request, res: Response) {
  const allergens: string[] = JSON.parse(req.headers.allergens as string);
  const courses = ['starter', 'main', 'side'];
  const menu: Recipe[] = [];

  courses.forEach(course => {
    const recipes: Recipe[] = db.filter(recipe =>
      recipeHasNoAllergens(recipe, allergens)
      && recipe.dishTypes?.includes(course)
    );
    menu.push(...sample(recipes, 1));
  });

  res.status(200).send(menu);
}
