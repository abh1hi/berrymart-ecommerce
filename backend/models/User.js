
/* backend/models/User.js */
// This new file defines the schema for our User model.
// Mongoose uses this schema to map documents from MongoDB to objects in our app.
/* backend/models/User.js */
// Updated to include an 'isAdmin' flag.
/* backend/models/User.js */
// Updated to include an 'isAdmin' flag for the seeder.
/* backend/models/User.js */
// The 'isAdmin' flag is kept for authorization.
/* backend/models/User.js */
// Updated to include an 'isAdmin' flag.
/* backend/models/User.js */
// The 'isAdmin' flag is kept for authorization.
/* backend/models/User.js */
// Updated to use a 'role' system instead of just 'isAdmin'.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user'
  },
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model('users', UserSchema);
