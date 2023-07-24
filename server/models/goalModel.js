// Goal.js (models/Goal.js)
const User = require('../models/userModel');
const mongoose = require('mongoose');

    

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model('Goal', goalSchema);
