const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const User = require('../models/user.model');

const mongoose = require('mongoose');
const databaseName = 'safood-test';

const mockUser = {
  name: 'test user',
  events: [],
  allergens: [],
  uid: '12345',
  aboutMe: 'test user about',
  img: ''
}

const mockUser2 = {
  name: 'test user 2',
  events: [],
  allergens: [],
  uid: '23456',
  aboutMe: 'test user about 2',
  img: ''
}

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
    
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  })

  it('should add a user to the database', async () => {

    //add the user to the db
    await request.post('/user').send(mockUser);

    //check if the user was added
    const user = await User.findOne({ name: mockUser.name });
    //assertion
    expect(user.name).toBe(mockUser.name);

  });

  it('should update a users allergens', async () => {
    const updates = {
      uid: '12345',
      allergens: ['wheat', 'dairy']
    }

    await request.put('/user/allergens').send(updates);
    const user = await User.findOne({name: mockUser.name})
    expect(user.allergens).toStrictEqual(["wheat", "dairy"]);
  });

  it('should get a user', async () => {
    const user = await request.get('/user').set('uid', mockUser.uid);
    expect(user.body.name).toBe(mockUser.name)
    expect(user.body.aboutMe).toBe(mockUser.aboutMe)
    expect(user.body.allergens).toStrictEqual(["wheat", "dairy"]);
  });

  it('should get all users', async () => {
    await request.post('/user').send(mockUser2);
    const res = await request.get('/users');
    const users = res.body;

    expect(users.length).toBe(2);
    expect(users[0].name).toBe(mockUser.name);
    expect(users[1].name).toBe(mockUser2.name);
  });



});




