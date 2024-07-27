const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  items: [{
    sushiId: {
      type: Schema.Types.ObjectId,
      ref: 'Sushi',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7200 // Orders expire after 2 hours (7200 seconds)
  }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
