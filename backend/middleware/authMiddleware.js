
/* backend/middleware/authMiddleware.js */
// This new file contains middleware to protect admin routes.
const passport = require('passport');

// Middleware to check if the user is authenticated
const isAuth = passport.authenticate('jwt', { session: false });

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is an admin, proceed
    } else {
        res.status(401).json({ msg: 'Not authorized as an admin' });
    }
};

module.exports = { isAuth, isAdmin };
