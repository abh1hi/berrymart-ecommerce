
/* backend/routes/api/cart.js */
// This new file handles all cart-related API requests.
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

// @route   POST api/cart
// @desc    Add item to cart
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
      let cart = await Cart.findOne({ user: userId });

      if (cart) {
        // Cart exists for user
        let itemIndex = cart.items.findIndex(p => p.product == productId);

        if (itemIndex > -1) {
          // Product exists in the cart, update the quantity
          let productItem = cart.items[itemIndex];
          productItem.quantity = quantity;
          cart.items[itemIndex] = productItem;
        } else {
          // Product does not exist in cart, add new item
          cart.items.push({ product: productId, quantity });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        // No cart for user, create new cart
        const newCart = await Cart.create({
          user: userId,
          items: [{ product: productId, quantity }]
        });
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Something went wrong');
    }
  }
);

// @route   GET api/cart
// @desc    Get user's cart
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
            if (!cart) {
                return res.status(404).json({ nocartfound: 'No cart found for this user' });
            }
            res.json(cart);
        } catch (err) {
            res.status(500).send('Something went wrong');
        }
    }
);


module.exports = router;
