/* backend/routes/api/analytics.js */
// This is a new file for handling analytics data requests.
const express = require('express');
const router = express.Router();
const { isAuth, isAdmin } = require('../../middleware/authMiddleware');

// Import Models
const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

// @route   GET api/admin/analytics/stats
// @desc    Get key stats for the admin dashboard (Admin only)
// @access  Private/Admin
router.get('/stats', isAuth, isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Calculate total sales using an aggregation pipeline
        const salesData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$total' }
                }
            }
        ]);

        const totalSales = salesData.length > 0 ? salesData[0].totalSales : 0;

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalSales
        });

    } catch (error) {
        console.error('Analytics error:', error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

