const mongoose = require('mongoose');

const SushiSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['regular', 'set'],
    required: true,
  },
});

module.exports = mongoose.model('Sushi', SushiSchema);
