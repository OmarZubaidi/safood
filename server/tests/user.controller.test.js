const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const User = require('../models/user.model');

const mongoose = require('mongoose');
const databaseName = 'test';

describe('Unit Tests - Unit Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  })

  it('should add a user to the database', async () => {

    //mock user to add to db
    const mockUser = {
      name: 'test user',
      events: [],
      allergens: [],
      uid: '12345',
      aboutMe: 'test user about',
      img: ''
    }

    //add the user to the db
    await request.post('/user').send(mockUser);

    //check if the user was added
    const user = await User.findOne({ name: mockUser.name });
    //assertion
    await expect(user.name).toBe(mockUser.name);

  });

});




