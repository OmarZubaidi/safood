const model = require('../models/user.model.js')

async function getUsers (req, res) {
  try {
    const users = await model.find();
    res.status(200);
    res.send(users);
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}

async function postUser (req, res) {
  try {
    const { name, allergens, uid, aboutMe, img } = req.body
    const user = await model.create({ name, allergens, uid, aboutMe, img });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}

async function getUser (req, res) {
  try {
    const user = await model.findOne({uid: req.headers.uid});
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}


async function updateUserAllergens (req, res) {
  try {
    const user = await model.findOneAndUpdate({uid: req.body.uid}, {allergens: req.body.allergens}, {
      new: true
    });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
}
/* 
async function updateUserEvents (req, res) {
  try {
    const user = await model.findOneAndUpdate({uid: req.body.uid}, {allergens: [...allergens, req.body.allergen]}, {
      new: true
    });
    res.status(200);
    res.send(user);
  } catch (error) {
    console.log('error', error)
    res.sendStatus(500)
  }
} */


module.exports = { getUser, getUsers, postUser, updateUserAllergens }