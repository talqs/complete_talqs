// models/History.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['summary', 'qa'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('History', historySchema);
