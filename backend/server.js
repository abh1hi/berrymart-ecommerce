
/* backend/server.js */
// Updated to use the new returns route.
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const users = require('./routes/api/users');
const products = require('./routes/api/products');
const cart = require('./routes/api/cart');
const orders = require('./routes/api/orders');
const wishlist = require('./routes/api/wishlist');
const coupons = require('./routes/api/coupons');
const admin = require('./routes/api/admin');
const returns = require('./routes/api/returns'); // Import returns route
const analytics = require('./routes/api/analytics'); // Import analytics route


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use(passport.initialize());
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/orders', orders);
app.use('/api/wishlist', wishlist);
app.use('/api/coupons', coupons);
app.use('/api/admin', admin);
app.use('/api/returns', returns); // Use returns route
app.use('/api/admin/analytics', analytics); // Use analytics route


app.listen(port, () => {
  console.log(`BerryMart backend listening at http://localhost:${port}`);
});
