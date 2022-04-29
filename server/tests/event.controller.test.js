const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const Event = require('../models/event.model');

const mongoose = require('mongoose');
const databaseName = 'safood-test';

const mockEvent = {
  type: 'Dinner',
  allergens: ['Dairy', 'Gluten'],
  members: ['nick', 'nack'],
  date: '26/08/90',
  menu: [{
    title: 'a dish'
  },{
    title: 'another dish'
  }]
}

const mockEvent2 = {
  type: 'Lunch',
  allergens: ['Dairy', 'Gluten'],
  members: ['nick', 'nack'],
  date: '26/08/90',
  menu: [{
    title: 'a second dish'
  },{
    title: 'a second another dish'
  }]
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
    await Event.deleteMany();
    await mongoose.disconnect();
  })

  it('should add an event to the database', async () => {
    //add the user to the db
    const result = await request.post('/event').send(mockEvent);
    const event = result.body;

    mockEvent._id = event._id;

    //check if the user was added
    const res = await Event.findOne({ _id: event._id });
    //assertion
    expect(res.type).toBe(mockEvent.type);
    expect(res.allergens).toStrictEqual(mockEvent.allergens);
    expect(res.members).toStrictEqual(mockEvent.members);
    expect(res.date).toBe(mockEvent.date);
  });

  it('should get an event from the database', async () => {
    const result = await request.get(`/event/${mockEvent._id}`);
    const res = result.body
    expect(res._id).toBe(mockEvent._id);
    expect(res.type).toBe(mockEvent.type);
    expect(res.allergens).toStrictEqual(mockEvent.allergens);
    expect(res.members).toStrictEqual(mockEvent.members);
    expect(res.date).toBe(mockEvent.date);
  });

  it('should get all events from the database', async () => {
    await request.post('/event').send(mockEvent2);
    const result = await request.get('/events');
    expect(result.body).toHaveLength(2);
  });

});

//create an event

//get an event

//get all events

//add recipes to event