// Package imports
const express = require('express');
const supertest = require('supertest');
const mongoose = require('mongoose');

// Local imports
const router = require('../router');

const databaseName = 'safood-test';

describe('Unit Tests - Menu Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  // Search string and allergens
  const string = 'curry lime';
  const allergens = JSON.stringify(['tomato', 'cheese']);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should get filtered recipes from the database', async () => {
    const res = await request.get('/menu')
      .set('string', string)
      .set('allergens', allergens);

    // Assertion
    res.body.every(({ ingredients }) => {
      expect(ingredients).not.toContain(...allergens);
    });
    expect(res.body).toHaveLength(3);
  });
});
