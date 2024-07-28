const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      describe: String,
      price: Number,
      img: String,
      type: String,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  name: String,
  address: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
