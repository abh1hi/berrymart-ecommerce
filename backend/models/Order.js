
/* backend/models/Order.js */
// This is a new model to define the schema for an Order.
/* backend/models/Order.js */
// Updated to include an order status.
/* backend/models/Order.js */
// Updated to include details for return requests.
/* backend/models/Order.js */
// Updated to include details for return requests.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Processing'
  },
  returnDetails: {
      isRequested: { type: Boolean, default: false },
      reason: { type: String },
      status: { type: String, default: 'Pending' }, // e.g., Pending, Approved, Rejected
      dateRequested: { type: Date }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model('orders', OrderSchema);

