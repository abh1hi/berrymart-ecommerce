
/* backend/routes/api/orders.js */
// This new file handles the order creation process.
/* backend/routes/api/orders.js */
// Updated to include a route for fetching a user's order history.

/* backend/routes/api/orders.js */
// Updated to send a confirmation email after an order is created.

/* backend/routes/api/orders.js */
// CORRECTED: Added the GET route for a user to fetch their own orders.
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const sendEmail = require('../../config/email');

// @route   POST api/orders
// @desc    Create a new order from the user's cart
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ msg: 'Cart is empty' });
      }

      let total = 0;
      const orderItems = cart.items.map(item => {
        total += item.product.price * item.quantity;
        return {
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        };
      });

      const newOrder = new Order({
        user: req.user.id,
        items: orderItems,
        total: total
      });

      const order = await newOrder.save();
      await Cart.findOneAndRemove({ user: req.user.id });
      
      const emailHtml = `<h1>Thank you for your order!</h1><p>Your order ID is: ${order._id}</p><p>Total: $${order.total.toFixed(2)}</p>`;
      
      try {
        await sendEmail({
          email: req.user.email,
          subject: 'Your BerryMart Order Confirmation',
          html: emailHtml
        });
        console.log('Confirmation email sent.');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }

      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/orders
// @desc    Get all orders for the current user
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const orders = await Order.find({ user: req.user.id })
                .sort({ date: -1 })
                .populate('items.product'); 
            res.json(orders);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


module.exports = router;
