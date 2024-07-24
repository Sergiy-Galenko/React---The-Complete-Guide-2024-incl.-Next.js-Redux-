const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      id: String,
      title: String,
      describe: String,
      price: Number,
      img: String,
      type: String,
      quantity: Number,
    }
  ],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now, expires: '2h' },
});

module.exports = mongoose.model('Order', orderSchema);
