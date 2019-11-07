const mongoose = require('mongoose');
const Tea = require('../models/tea.js');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true},
  favs: [Tea.schema]
});

const User = mongoose.model('User', userSchema)

module.exports = User;
