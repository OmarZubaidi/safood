const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  type: { type: String, required: true },
  allergens: [String],
  members: [String],
  date: String
}, { timestamps: false })
  
module.exports = mongoose.model('events', Schema)