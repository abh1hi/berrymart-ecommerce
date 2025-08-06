/* backend/models/Wishlist.js */
// This is a new model to define the schema for the Wishlist.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Wishlist = mongoose.model('wishlists', WishlistSchema);
