const mongoose = require('mongoose');

const clientsChatBot = mongoose.model('clientsChatBot', mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  regnumber: {
    type: String,
    required: false,
    maxlength: 9,
  },
  vitian: {
    type: Boolean,
    default: false,
  },
  clientName: {
    type: String
  },
  events:{
    type: Array,
    required: true
  },
  code:{
    type:String,
    required: true
  },
  points:{
    type: Number,
    default: 0
  },
}));

module.exports = clientsChatBot;
