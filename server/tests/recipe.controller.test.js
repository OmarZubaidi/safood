// Package imports
const express = require('express');
const supertest = require('supertest');
const mongoose = require('mongoose');

// Local imports
// const db = require('../db');
const router = require('../router');

const databaseName = 'safood-test';

describe('Unit Tests - Recipe Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  // Search string and allergens
  const string = '';
  const allergens = JSON.stringify(['tomato', 'cheese']);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get all recipes from the database', async () => {
    const res = await request.get('/recipe')
      .set('string', string)
      .set('allergens', allergens);

    // Assertion
    res.body.every(({ ingredients }) => {
      expect(ingredients).not.toContain(...allergens);
    });
  });

  it('should get random recipes from the database', async () => {
    const res = await request.get('/recipe/random')
      .set('string', string)
      .set('allergens', allergens);

    // Assertion
    res.body.every(({ ingredients }) => {
      expect(ingredients).not.toContain(...allergens);
    });
  });
});
