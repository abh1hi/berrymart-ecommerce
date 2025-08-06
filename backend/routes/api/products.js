
/* backend/routes/api/products.js */
// This is a new file to handle all product-related API requests.

/* backend/routes/api/products.js */
// Updated to handle creating and viewing reviews.
/* backend/routes/api/products.js */
// This file is now for PUBLIC product routes only (viewing products).
/* backend/routes/api/products.js */
// Updated to handle search and category filtering.
const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

// @route   GET api/products
// @desc    Get all products, with optional search and filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i' // 'i' for case-insensitive
      }
    } : {};

    const category = req.query.category ? {
        category: req.query.category
    } : {};

    const products = await Product.find({ ...keyword, ...category });
    res.json(products);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/products/:id
// @desc    Get single product by id
// @access  Public
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if(!product) {
          return res.status(404).json({ noproductfound: 'No product found with that ID' });
      }
      res.json(product)
    })
    .catch(err => res.status(404).json({ noproductfound: 'No product found with that ID' })
    );
});

module.exports = router;
