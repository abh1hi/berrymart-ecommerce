
/* backend/models/Cart.js */
// This is a new model to define the schema for the shopping cart.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
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
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model('carts', CartSchema);
