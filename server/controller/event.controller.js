// Local imports
const model = require('../models/event.model.js');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

async function getEvents (req, res) {
  try {
    const events = await model.find();
    res.status(200).send(events);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

async function getEvent (req, res) {
  try {
    const event = await model.findOne({ _id: req.params._id });
    res.status(200).send(event);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

async function postEvent (req, res) {
  try {
    const { type, allergens, members, date, menu } = req.body;
    const event = await model.create({
      type,
      allergens,
      members,
      date,
      menu
    });
    res.status(201).send(event);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

module.exports = { getEvent, getEvents, postEvent };
