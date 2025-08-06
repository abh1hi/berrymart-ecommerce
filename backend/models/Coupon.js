/* backend/models/Coupon.js */
// This is a new model to define the schema for Coupons.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  discountType: {
    type: String,
    required: true,
    enum: ['percentage', 'fixed'] // Can be a percentage off or a fixed amount
  },
  discountValue: {
    type: Number,
    required: true
  },
  expiresAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = Coupon = mongoose.model('coupons', CouponSchema);

