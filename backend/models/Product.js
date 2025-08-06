
/* backend/models/Product.js */
// This is a new file to define the schema for a Product.
/* backend/models/Product.js */
// Updated to include reviews and ratings.

/* backend/models/Product.js */
// Updated to associate each product with a vendor.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
}, { timestamps: true });

const ProductSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 0 },
  reviews: [ReviewSchema],
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  date: { type: Date, default: Date.now }
});

module.exports = Product = mongoose.model('products', ProductSchema);
