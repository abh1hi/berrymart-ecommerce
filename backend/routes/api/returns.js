
/* backend/routes/api/returns.js */
// This is a new file for users to request a return.
const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middleware/authMiddleware');
const Order = require('../../models/Order');

// @route   POST api/returns/:orderId
// @desc    Request a return for an order
// @access  Private
router.post('/:orderId', isAuth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        // Ensure the user requesting the return owns the order
        if (order.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        order.returnDetails.isRequested = true;
        order.returnDetails.reason = req.body.reason;
        order.returnDetails.dateRequested = Date.now();
        order.returnDetails.status = 'Pending';

        await order.save();
        res.json(order);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

