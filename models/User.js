const mongoose = require('mongoose');

const users = mongoose.model('users', mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    index: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}));

module.exports = users;
