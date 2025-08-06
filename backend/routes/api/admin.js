/* backend/routes/api/admin.js */
// CORRECTED: This file now contains the complete logic for all admin routes, including bulk upload.
const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../../middleware/authMiddleware');

// Import Models
const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const Coupon = require('../../models/Coupon');

// --- User Routes ---
router.get('/users', isAuth, isAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// --- Order Routes ---
router.get('/orders', isAuth, isAdmin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});
router.get('/orders/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');
        if (!order) return res.status(404).json({ msg: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});
router.put('/orders/:id/status', isAuth, isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ msg: 'Order not found' });
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// --- Product Routes ---
router.post('/products', isAuth, isAdmin, (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock
    });
    newProduct.save().then(product => res.status(201).json(product));
});
router.put('/products/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});
router.delete('/products/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json({ msg: 'Product removed' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// --- Bulk Product Upload Route ---
router.post('/products/bulk', isAuth, isAdmin, async (req, res) => {
    try {
        const products = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ msg: 'Please provide an array of products.' });
        }
        await Product.deleteMany({});
        await Product.insertMany(products);
        res.status(201).json({ msg: `${products.length} products have been successfully uploaded.` });
    } catch (error) {
        console.error('Bulk upload error:', error.message);
        res.status(500).send('Server Error');
    }
});

// --- Coupon Routes ---
router.get('/coupons', isAuth, isAdmin, async (req, res) => {
    const coupons = await Coupon.find({});
    res.json(coupons);
});
router.post('/coupons', isAuth, isAdmin, async (req, res) => {
    const { code, discountType, discountValue, expiresAt } = req.body;
    try {
        const newCoupon = new Coupon({ code: code.toUpperCase(), discountType, discountValue, expiresAt });
        const coupon = await newCoupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});
router.delete('/coupons/:id', isAuth, isAdmin, async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) return res.status(404).json({ msg: 'Coupon not found' });
        res.json({ msg: 'Coupon removed' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// --- Return Routes ---
router.get('/returns', isAuth, isAdmin, async (req, res) => {
    try {
        const returns = await Order.find({ 'returnDetails.isRequested': true }).populate('user', 'name email').sort({ 'returnDetails.dateRequested': -1 });
        res.json(returns);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});
router.put('/returns/:orderId', isAuth, isAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order) {
            order.returnDetails.status = req.body.status || order.returnDetails.status;
            await order.save();
            res.json(order);
        } else {
            res.status(404).json({ msg: 'Order not found' });
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
