
/* backend/routes/api/wishlist.js */
// This new file handles all wishlist-related API requests.
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Wishlist = require('../../models/Wishlist');

// @route   GET api/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
      if (!wishlist) {
        return res.json({ products: [] }); // Return empty if no wishlist
      }
      res.json(wishlist);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/wishlist
// @desc    Add a product to the wishlist
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
      let wishlist = await Wishlist.findOne({ user: userId });

      if (!wishlist) {
        // If no wishlist, create a new one
        wishlist = new Wishlist({ user: userId, products: [productId] });
      } else {
        // Add product to existing wishlist if not already there
        if (!wishlist.products.includes(productId)) {
          wishlist.products.push(productId);
        }
      }

      await wishlist.save();
      const populatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
      res.json(populatedWishlist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/wishlist/:productId
// @desc    Remove a product from the wishlist
// @access  Private
router.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.id;

    try {
      const wishlist = await Wishlist.findOne({ user: userId });

      if (wishlist) {
        // Remove the product from the array
        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
        await wishlist.save();
      }
      
      const populatedWishlist = await Wishlist.findOne({ user: userId }).populate('products');
      res.json(populatedWishlist || { products: [] });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

