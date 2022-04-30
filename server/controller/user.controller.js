// Local imports
const model = require('../models/user.model');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

async function getUsers (req, res) {
  try {
    const users = await model.find();
    res.status(200).send(users);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

async function postUser (req, res) {
  try {
    const { name, allergens, uid, about, img } = req.body;
    const user = await model.create({
      name,
      allergens,
      uid,
      about,
      img
    });
    res.status(201).send(user);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

async function getUser (req, res) {
  try {
    const user = await model.findOne({ uid: req.headers.uid });
    res.status(200).send(user);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

async function updateUserAllergens (req, res) {
  try {
    const user = await model.findOneAndUpdate(
      { uid: req.body.uid },
      { allergens: req.body.allergens },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    asyncErrorHandler(error, res);
  }
}

module.exports = { getUser, getUsers, postUser, updateUserAllergens };
