const model = require('../models/event.model.js');

async function getEvents (req, res) {
  try {
    const users = await model.find();
    res.status(200);
    res.send(users);
  } catch (error) {
    console.log('error', error);
    res.sendStatus(500);
  }
}

async function getEvent (req, res) {
  try {
    const user = await model.findOne({ _id: req.params._id });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('error', error);
    res.sendStatus(500);
  }
}

async function postEvent (req, res) {
  try {
    const { type, allergens, members, date, menu } = req.body;
    const user = await model.create({ type, allergens, members, date, menu });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('error', error);
    res.sendStatus(500);
  }
}

async function addRecipesToEvent (req, res) {
  try {
    const user = await model.findOneAndUpdate({ _id: req.body._id }, { recipes: req.body.recipes }, {
      new: true
    });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('error', error);
    res.sendStatus(500);
  }
}

module.exports = { getEvent, getEvents, postEvent, addRecipesToEvent };
