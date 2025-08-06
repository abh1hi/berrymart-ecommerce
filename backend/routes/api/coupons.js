
/* backend/routes/api/coupons.js */
// This new file handles validating a coupon code.
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Coupon = require('../../models/Coupon');
const Cart = require('../../models/Cart');

// @route   POST api/coupons/apply
// @desc    Apply a coupon to the user's cart
// @access  Private
router.post(
  '/apply',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { code } = req.body;

    try {
      // Find the coupon
      const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
      if (!coupon) {
        return res.status(404).json({ msg: 'Coupon not found or is inactive' });
      }

      // Check if coupon is expired
      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        return res.status(400).json({ msg: 'Coupon is expired' });
      }

      // Find the user's cart
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ msg: 'Your cart is empty' });
      }

      // Calculate original total
      let total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      let discountAmount = 0;

      // Calculate discount
      if (coupon.discountType === 'percentage') {
        discountAmount = (total * coupon.discountValue) / 100;
      } else { // 'fixed'
        discountAmount = coupon.discountValue;
      }
      
      // Ensure discount doesn't exceed total
      discountAmount = Math.min(total, discountAmount);

      const newTotal = total - discountAmount;

      res.json({
        originalTotal: total,
        discountAmount: discountAmount.toFixed(2),
        newTotal: newTotal.toFixed(2),
        couponCode: coupon.code
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
