// Package imports
import express from 'express';
import supertest from 'supertest';
import mongoose from 'mongoose';

// Local imports
import router from '../router';
import IRecipe from '../interfaces/Recipe.interface';

const databaseName = 'safood-test';

describe('Unit Tests - Recipe Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  // Search string and allergens
  const string = '';
  const allergens = ['tomato', 'cheese'];

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get all recipes from the database', async () => {
    const result = await request.get('/recipe')
      .set('string', string)
      .set('allergens', JSON.stringify(allergens));
    // TODO there has to be a better way to assign a type to result.body
    const res: IRecipe[] = result.body;

    // Assertion
    res.every(({ ingredients }) => {
      expect(ingredients).not.toContainEqual(allergens);
    });
  });

  it('should get random recipes from the database', async () => {
    const result = await request.get('/recipe/random')
      .set('string', string)
      .set('allergens', JSON.stringify(allergens));
    const res: IRecipe[] = result.body;

    // Assertion
    res.every(({ ingredients }) => {
      expect(ingredients).not.toContainEqual(allergens);
    });
  });
});
