const mongoose = require('mongoose');

const teaSchema = new mongoose.Schema({
  name: { type: String, required: true},
  type: { type: String, required: true },
  origin: { type: String, required: true },
  img: { type: String }
});

const Tea = mongoose.model('Tea', teaSchema)

module.exports = Tea;
