const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SushiSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  describe: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['normal', 'set'],
    required: true
  }
});

const Sushi = mongoose.model('Sushi', SushiSchema);
module.exports = Sushi;
