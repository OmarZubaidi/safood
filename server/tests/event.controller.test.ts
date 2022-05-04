// Package imports
import express from 'express';
import mongoose, { ObjectId } from 'mongoose';
import supertest from 'supertest';

// Local imports
import router from '../router';
import Event from '../models/event.model';
import { IEventDB } from '../interfaces/Event.interface';
import IRecipe from '../interfaces/Recipe.interface';

const databaseName = 'safood-test';

const mockMenu: IRecipe[] = [
  {
    id: '1',
    title: 'a starter',
    vegetarian: 'False',
    vegan: 'False',
    glutenFree: 'False',
    dairyFree: 'False',
    sustainable: 'False',
    veryHealthy: 'False',
    veryPopular: 'False',
    lowFodmap: 'False',
    ketogenic: 'False',
    whole30: 'False',
    readyInMinutes: '30',
    image: 'https://spoonacular.com/recipeImages/1-556x370.jpg',
    dishTypes: 'starter',
    ingredients: 'tomato,egg,cheese',
  },
  {
    id: '2',
    title: 'a main',
    vegetarian: 'False',
    vegan: 'False',
    glutenFree: 'False',
    dairyFree: 'False',
    sustainable: 'False',
    veryHealthy: 'False',
    veryPopular: 'False',
    lowFodmap: 'False',
    ketogenic: 'False',
    whole30: 'False',
    readyInMinutes: '45',
    image: 'https://spoonacular.com/recipeImages/1-556x370.jpg',
    dishTypes: 'main',
    ingredients: 'tomato,egg,cheese',
  },
  {
    id: '3',
    title: 'a side',
    vegetarian: 'False',
    vegan: 'False',
    glutenFree: 'False',
    dairyFree: 'False',
    sustainable: 'False',
    veryHealthy: 'False',
    veryPopular: 'False',
    lowFodmap: 'False',
    ketogenic: 'False',
    whole30: 'False',
    readyInMinutes: '15',
    image: 'https://spoonacular.com/recipeImages/1-556x370.jpg',
    dishTypes: 'side dish',
    ingredients: 'tomato,egg,cheese',
  },
]

const mockEvent: IEventDB = {
  _id: '626cfe1a2bcd34e567890f15' as unknown as ObjectId,
  type: 'Dinner',
  allergens: ['tomato', 'cheese'],
  members: ['nick', 'nack'],
  date: '26/08/90',
  menu: mockMenu
};

const mockEvent2: IEventDB = {
  _id: '626cfe1a2bcd34e567890f16' as unknown as ObjectId,
  type: 'Lunch',
  allergens: ['basil', 'oregano'],
  members: ['nick', 'nack'],
  date: '26/08/90',
  menu: mockMenu
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
    await Event.deleteMany();
    await mongoose.disconnect();
  });

  // Create an event
  it('should add an event to the database', async () => {
    // Add the event to the db
    const result = await request.post('/event').send(mockEvent);
    // TODO there has to be a better way to assign a type to result.body
    const event: IEventDB = result.body;

    mockEvent._id = event._id;

    // Check if the event was added
    const res = await Event.findOne({ _id: event._id });
    // Assertions
    if (!res) throw new Error('Could not find event.');
    expect(res.type).toBe(mockEvent.type);
    expect(res.allergens).toStrictEqual(mockEvent.allergens);
    expect(res.members).toStrictEqual(mockEvent.members);
    expect(res.date).toBe(mockEvent.date);
  });

  // Get an event
  it('should get an event from the database', async () => {
    const result = await request.get(`/event/${mockEvent._id}`);
    const res: IEventDB = result.body;
    expect(res._id).toBe(mockEvent._id);
    expect(res.type).toBe(mockEvent.type);
    expect(res.allergens).toStrictEqual(mockEvent.allergens);
    expect(res.members).toStrictEqual(mockEvent.members);
    expect(res.date).toBe(mockEvent.date);
  });

  // Get all events
  it('should get all events from the database', async () => {
    await request.post('/event').send(mockEvent2);
    const result = await request.get('/events');
    const res: IEventDB = result.body;
    expect(res).toHaveLength(2);
  });
});
