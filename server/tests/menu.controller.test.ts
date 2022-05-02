// Package imports
import express, { request } from 'express';
import supertest from 'supertest';
import mongoose from 'mongoose';

// Local imports
import router from '../router';
import IRecipe from '../interfaces/Recipe.interface';

const databaseName = 'safood-test';

describe('Unit Tests - Menu Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  // Search string and allergens
  const string = 'curry lime';
  const allergens = ['tomato', 'cheese'];

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get filtered recipes from the database', async () => {
    const result = await request.get('/menu')
      .set('string', string)
      .set('allergens', JSON.stringify(allergens));
    // TODO there has to be a better way to assign a type to result.body
    const res: IRecipe[] = result.body;

    // Assertion
    res.every(({ ingredients }) => {
      expect(ingredients).not.toContainEqual(allergens);
    });
    // Starter, main, side
    expect(res).toHaveLength(3);
  });
});
