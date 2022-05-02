// Package imports
import express from 'express';
import mongoose, { ObjectId } from 'mongoose';
import supertest from 'supertest';

// Local imports
import router from '../router';
import User from '../models/user.model';
import { IUserDB } from '../interfaces/User.interface';

const databaseName = 'safood-test';

const mockUser: IUserDB = {
  _id: '626cfe1a2bcd34e567890f12' as unknown as ObjectId,
  name: 'test user',
  allergens: [],
  events: [],
  uid: '12345',
  about: 'test user about',
  img: ''
};

const mockUser2: IUserDB = {
  _id: '626cfe1a2bcd34e567890f13' as unknown as ObjectId,
  name: 'test user 2',
  allergens: [],
  events: [],
  uid: '23456',
  about: 'test user about 2',
  img: ''
};

describe('Unit Tests - Unit Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it('should add a user to the database', async () => {

    // Add the user to the db
    await request.post('/user').send(mockUser);

    // Check if the user was added
    const user = await User.findOne({ name: mockUser.name });
    // Assertion
    if (user) expect(user.name).toBe(mockUser.name);
    else throw new Error('Could not find user.');

  });

  it('should update a users allergens', async () => {
    const updates = {
      uid: '12345',
      allergens: ['wheat', 'dairy']
    };

    await request.put('/user/allergens').send(updates);
    const user = await User.findOne({ name: mockUser.name });
    if (user) expect(user.allergens).toStrictEqual(["wheat", "dairy"]);
    else throw new Error('Could not find user.');
  });

  it('should get a user', async () => {
    const result = await request.get('/user').set('uid', mockUser.uid);
    // TODO there has to be a better way to assign a type to result.body
    const user: IUserDB = result.body;
    expect(user.name).toBe(mockUser.name);
    expect(user.about).toBe(mockUser.about);
    expect(user.allergens).toStrictEqual(["wheat", "dairy"]);
  });

  it('should get all users', async () => {
    await request.post('/user').send(mockUser2);
    const result = await request.get('/users');
    const users: IUserDB[] = result.body;

    expect(users.length).toBe(2);
    expect(users[0].name).toBe(mockUser.name);
    expect(users[1].name).toBe(mockUser2.name);
  });
});
