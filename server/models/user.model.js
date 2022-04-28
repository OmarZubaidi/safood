const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  allergens: [String],
  events: [String],
  uid: { type: String, required: true }
}, { timestamps: false });

module.exports = mongoose.model('users', Schema);
