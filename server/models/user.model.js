// Package imports
const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  allergens: [String],
  events: [String],
  uid: { type: String, required: true },
  aboutMe: String,
  img: String
}, { timestamps: false });

module.exports = mongoose.model('users', Schema);
